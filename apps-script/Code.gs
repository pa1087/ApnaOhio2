/**
 * ApnaOhio2 Google Sheets backend.
 * Bind this script to your Sheet using Extensions > Apps Script.
 * Run setupApnaOhio once, then deploy as a Web App (execute as Me; access Anyone).
 */
const CFG={LISTINGS:"Listings",REPORTS:"Reports",DAYS:30,POST_WAIT:60,REPORT_WAIT:30};
const LIST_HEADERS=["id","type","category","title","description","city","zip","price","availability","from","to","travelDate","seats","contactName","email","phone","whatsapp","createdAt","expiresAt"];
const REPORT_HEADERS=["createdAt","listingId","reason","status"];

function setupApnaOhio(){
  const book=getBook_();
  PropertiesService.getScriptProperties().setProperty("SPREADSHEET_ID",book.getId());
  ensureSheet_(book,CFG.LISTINGS,LIST_HEADERS);
  ensureSheet_(book,CFG.REPORTS,REPORT_HEADERS);
  Logger.log("ApnaOhio2 spreadsheet: " + book.getUrl());
  return "ApnaOhio2 sheets are ready. Spreadsheet: " + book.getUrl();
}
function doGet(e){
  const p=(e&&e.parameter)||{};
  if(p.action!=="list")return json_({ok:true,service:"ApnaOhio2",message:"API is running."});
  try{
    const data={ok:true,listings:activeListings_()};
    const cb=String(p.callback||"");
    if(cb&&/^[A-Za-z_$][0-9A-Za-z_$\.]*$/.test(cb))return ContentService.createTextOutput(cb+"("+JSON.stringify(data)+");").setMimeType(ContentService.MimeType.JAVASCRIPT);
    return json_(data);
  }catch(err){return json_({ok:false,error:"Unable to read listings."});}
}
function doPost(e){
  try{
    const body=JSON.parse(e&&e.postData&&e.postData.contents?e.postData.contents:"{}");
    if(body.website)return json_({ok:true});
    if(body.action==="create")return createListing_(body.listing||{});
    if(body.action==="report")return createReport_(body);
    return json_({ok:false,error:"Unsupported action."});
  }catch(err){return json_({ok:false,error:"Invalid request."});}
}
function createListing_(x){
  const type=clean_(x.type,24),allowed=["accommodations","rides","community"];
  if(allowed.indexOf(type)<0)return json_({ok:false,error:"Invalid section."});
  const r={id:clean_(x.id,80)||Utilities.getUuid(),type:type,category:clean_(x.category,60),title:clean_(x.title,90),description:clean_(x.description,1200),city:clean_(x.city,60),zip:clean_(x.zip,10),price:clean_(x.price,40),availability:clean_(x.availability,60),from:clean_(x.from,70),to:clean_(x.to,70),travelDate:clean_(x.travelDate,20),seats:clean_(x.seats,30),contactName:clean_(x.contactName,60),email:clean_(x.email,120).toLowerCase(),phone:clean_(x.phone,24),whatsapp:clean_(x.whatsapp,24)};
  if(!r.title||!r.category||!r.city||!r.description)return json_({ok:false,error:"Complete required fields."});
  if(!r.email&&!r.phone&&!r.whatsapp)return json_({ok:false,error:"A contact method is required."});
  if(r.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email))return json_({ok:false,error:"Invalid email address."});
  if(type==="rides"&&!r.from&&!r.to)return json_({ok:false,error:"Ride needs a starting point or destination."});
  if(throttled_("post_"+hash_(r.email||r.phone||r.whatsapp),CFG.POST_WAIT))return json_({ok:false,error:"Please wait before posting again."});
  const now=new Date();r.createdAt=now.toISOString();r.expiresAt=new Date(now.getTime()+CFG.DAYS*86400000).toISOString();
  const lock=LockService.getScriptLock();lock.waitLock(10000);
  try{const book=getBook_(),sheet=ensureSheet_(book,CFG.LISTINGS,LIST_HEADERS);sheet.appendRow(LIST_HEADERS.map(h=>r[h]||""))}
  finally{lock.releaseLock()}
  return json_({ok:true,listingId:r.id,expiresAt:r.expiresAt});
}
function createReport_(x){
  const id=clean_(x.listingId,80),reason=clean_(x.reason,300);
  if(!id||!reason)return json_({ok:false,error:"Missing report details."});
  if(throttled_("report_"+hash_(id),CFG.REPORT_WAIT))return json_({ok:false,error:"Report recently received."});
  const lock=LockService.getScriptLock();lock.waitLock(10000);
  try{const book=getBook_(),sheet=ensureSheet_(book,CFG.REPORTS,REPORT_HEADERS);sheet.appendRow([new Date().toISOString(),id,reason,"Open"])}
  finally{lock.releaseLock()}
  return json_({ok:true});
}
function activeListings_(){
  const sheet=ensureSheet_(getBook_(),CFG.LISTINGS,LIST_HEADERS),values=sheet.getDataRange().getValues();
  if(values.length<2)return[];
  const headers=values[0].map(String),now=Date.now();
  return values.slice(1).map(row=>{const item={};headers.forEach((h,i)=>item[h]=row[i] instanceof Date?row[i].toISOString():row[i]);return item})
    .filter(item=>item.id&&item.expiresAt&&new Date(item.expiresAt).getTime()>now).reverse();
}
function getBook_(){
  const props=PropertiesService.getScriptProperties();
  const id=props.getProperty("SPREADSHEET_ID");
  if(id)return SpreadsheetApp.openById(id);
  const active=SpreadsheetApp.getActiveSpreadsheet();
  if(active){props.setProperty("SPREADSHEET_ID",active.getId());return active;}
  // A standalone Apps Script project can create and bind the Sheet automatically.
  const created=SpreadsheetApp.create("ApnaOhio2 Community Listings");
  props.setProperty("SPREADSHEET_ID",created.getId());
  return created;
}
function ensureSheet_(book,name,headers){
  let sheet=book.getSheetByName(name);if(!sheet)sheet=book.insertSheet(name);
  if(sheet.getLastRow()===0){sheet.appendRow(headers);sheet.setFrozenRows(1);sheet.getRange(1,1,1,headers.length).setFontWeight("bold").setBackground("#173d36").setFontColor("#ffffff");sheet.autoResizeColumns(1,headers.length)}
  return sheet;
}
function clean_(v,max){return String(v==null?"":v).replace(/<[^>]*>/g,"").replace(/[\u0000-\u001F\u007F]/g," ").trim().slice(0,max)}
function hash_(v){return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,String(v),Utilities.Charset.UTF_8)).replace(/=+$/g,"")}
function throttled_(key,seconds){const cache=CacheService.getScriptCache();if(cache.get(key))return true;cache.put(key,"1",seconds);return false}
function json_(data){return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)}
