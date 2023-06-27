use('zumenAgentDB');
var db = connect('172.31.58.231:8560/zumenAgentDB')

db.user_connection_detail.drop()
db.endpointsmappingstore.drop()
db.url_meta_data.drop()
db.mappingstore.drop()

//One time connection configuration
db.user_connection_detail.insert({connection:"SAP_ON_PREMISE_ECC",
connectionType:"ENTERPRISE_RESOURCE_PLANNING",ipAddress:"/H/10.90.10.153/S/3300",
orgId:"buy2324950f126b",userName:"zumen",password:"Zumen@1234",systemNR:"00",clientNR:"900",language:"EN"})

/*db.user_connection_detail.insert({connection:"WINDCHILL",
connectionType:"PRODUCT_LIFECYCLE_MANAGEMENT",baseUrl:"http://90.10.150.123:80",
orgId:"buy2324950f126b",userName:"ZUMEN",password:"ZUMEN",language:"EN"})*/



//Mapping configuration
const connectiondetails =  db.user_connection_detail.find({orgId:"buy2324950f126b"}).forEach(function(conn){
   let  x = conn._id.toString();
   x = x.replace("ObjectId","")
   x = x.replace("(","")
   x = x.replace(")","")
   x = x.replace("\"","")
   x = x.replace("\"","")
   db.endpointsmappingstore.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndPoint:"/parts",zumenAgentEndpoint:"/sap/ecc/v1/material",httpOperation:"GET"})
   let sappartsschema = JSON.stringify({partNumber:"string",partDescription:"string",partLocation:"string",partReference:"string",makeBuy:"string",uom:"string",makePrice:"float",buyPrice:"float"})
   db.url_meta_data.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts",httpOperation:"GET",responseMetaData:sappartsschema})
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts",httpOperation:"GET",outputField:"partNumber",inputField:"materialNumber"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts",httpOperation:"GET",outputField:"partDescription",inputField:"materialDescription"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts",httpOperation:"GET",outputField:"erpPartRef",inputField:"oldMaterialNumber"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts",httpOperation:"GET",outputField:"makeBuy",inputField:"procurementType"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts",httpOperation:"GET",outputField:"uom",inputField:"unitOfMeasure"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts",httpOperation:"GET",outputField:"makePrice",inputField:"materialPriceControl.makePrice"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts",httpOperation:"GET",outputField:"buyPrice",inputField:"materialPriceControl.buyPrice"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts",httpOperation:"GET",outputField:"partLocation",inputField:"plant"}])
  

   db.endpointsmappingstore.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndPoint:"/parts/location",zumenAgentEndpoint:"/sap/ecc/v1/material/plant",httpOperation:"GET"})
   sappartsschema = JSON.stringify([{partNumber:"string",partLocation:"string"}])
   db.url_meta_data.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts/location",httpOperation:"GET",responseMetaData:sappartsschema})
  db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts/location",httpOperation:"GET",outputField:"partNumber",inputField:"materialNumber"}])
  db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts/location",httpOperation:"GET",outputField:"partLocation",inputField:"plant"}])

   db.endpointsmappingstore.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndPoint:"/parts/partrate",zumenAgentEndpoint:"/sap/ecc/v1/material/rate",httpOperation:"GET"})
    sappartsschema = JSON.stringify({partNumber:"string",partDescription:"string",unitCost:"float",currency:"string"})
   db.url_meta_data.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts/partrate",httpOperation:"GET",responseMetaData:sappartsschema})

   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts/partrate",httpOperation:"GET",outputField:"partNumber",inputField:"materialNumber"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts/partrate",httpOperation:"GET",outputField:"partDescription",inputField:"materialDescription"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts/partrate",httpOperation:"GET",outputField:"unitCost",inputField:"targetPrice"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/parts/partrate",httpOperation:"GET",outputField:"currency",inputField:"currencyKey"}])



   db.endpointsmappingstore.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndPoint:"/pricingdetails",zumenAgentEndpoint:"sap/ecc/v1/material/inforecord",httpOperation:"POST"})
   sappartsschema = JSON.stringify([{erpItemCode:"string",makeBuy:"string",unitRate:"float",erpSupplierCode:"string",oneTimePriceFlag:"string",poquantitylimit:"float",productioncapacityofparts:"number",rfqNumber:"string"}])
   db.url_meta_data.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/pricingdetails",httpOperation:"POST",requestMetaData:sappartsschema})

   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/pricingdetails",httpOperation:"POST",outputField:"materialNumber",inputField:"erpItemCode"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/pricingdetails",httpOperation:"POST",outputField:"procurementType",inputField:"makeBuy"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/pricingdetails",httpOperation:"POST",outputField:"partCost",inputField:"unitRate"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/pricingdetails",httpOperation:"POST",outputField:"vendor",inputField:"erpSupplierCode"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/pricingdetails",httpOperation:"POST",outputField:"oneTimePriceFlag",inputField:"oneTimePriceFlag"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/pricingdetails",httpOperation:"POST",outputField:"quantity",inputField:"poQuantityLimit"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/pricingdetails",httpOperation:"POST",outputField:"rfqNumber",inputField:"rfqNumber"}])


   db.endpointsmappingstore.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndPoint:"/purchaseorder",zumenAgentEndpoint:"sap/ecc/v1/purchaseorder",parameters:["purchaseordernumber"],httpOperation:"GET"})
   sappartsschema = JSON.stringify({poNo:"string",companyCode:"string",documentType:"string",documentDate:"string",releaseStatus:"string",supplier:"string",paymentTerms:"string",po_item:[{
      poItemNumber:"string",partDescription:"string",partNumber:"string",unitRate:"string",quantity:"string",uom:"string",currencyIso:"string",deliveryTimeInDays:"number"
   }]})

   db.url_meta_data.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],responseMetaData:sappartsschema})

   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"poNo",inputField:"pono"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"companyCode",inputField:"companycode"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"documentType",inputField:"documenttype"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"documentDate",inputField:"documentDate"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"supplier",inputField:"vendor"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"paymentTerms",inputField:"paymentTerms"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"releaseStatus",inputField:"releaseStatus"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"po_item",inputField:"purchaseOrderItem"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"po_item.poItemNumber",inputField:"purchaseOrderItem.poItemNumber"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"po_item.partDescription",inputField:"purchaseOrderItem.partDescription"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"po_item.partNumber",inputField:"purchaseOrderItem.materialNumber"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"po_item.unitRate",inputField:"purchaseOrderItem.unitRate"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"po_item.quantity",inputField:"purchaseOrderItem.quantity"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"po_item.uom",inputField:"purchaseOrderItem.uom"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"po_item.currencyIso",inputField:"purchaseOrderItem.currencyIso"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["purchaseordernumber"],outputField:"po_item.deliveryTimeInDays",inputField:"purchaseOrderItem.deliveryTimeInDays"}])

   db.endpointsmappingstore.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndPoint:"/purchaseorder",zumenAgentEndpoint:"sap/ecc/v1/purchaseorder",parameters:["partnumber"],httpOperation:"GET"})
   sappartsschema = JSON.stringify([{poNo:"string"}])

   db.url_meta_data.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["partnumber"],responseMetaData:sappartsschema})

   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["partnumber"],outputField:"poNo",inputField:"pono"}])

   
   db.endpointsmappingstore.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndPoint:"/purchaseorder",zumenAgentEndpoint:"sap/ecc/v1/purchaseorder",parameters:["creationdate"],httpOperation:"GET"})
   sappartsschema = JSON.stringify([{poNo:"string"}])

   db.url_meta_data.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["creationdate"],responseMetaData:sappartsschema})

   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/purchaseorder",httpOperation:"GET",parameters:["creationdate"],outputField:"poNo",inputField:"pono"}])


    //Suppliers with top and skip
   db.endpointsmappingstore.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndPoint:"/supplier",zumenAgentEndpoint:"sap/ecc/v1/vendors",parameters:["top","skip"],  httpOperation:"GET"})
   sappartsschema = JSON.stringify([{supplierNumber:"string",supplierName: "string",supplierAddress:"string",supplierEmail:"string",supplierTaxNumber:"string"}])
   db.url_meta_data.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["top","skip"], responseMetaData:sappartsschema})

   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["top","skip"],outputField:"supplierNumber",inputField:"vendorNumber"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["top","skip"],outputField:"supplierName",inputField:"vendorName"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["top","skip"],outputField:"supplierAddress",inputField:"address"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["top","skip"],outputField:"supplierEmail",inputField:"email"}])
   db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["top","skip"],outputField:"supplierTaxNumber",inputField:"taxNumber"}])


    //Suppliers with purchase org and vendornumber
    db.endpointsmappingstore.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndPoint:"/supplier",zumenAgentEndpoint:"pricol/sap/ecc/v1/vendors",parameters:["vendornumber","purchaseorg"],  httpOperation:"GET"})

    sappartsschema = JSON.stringify([{supplierNumber:"string",companyCode:"string",purchaseOrg:"string", supplierName: "string",supplierAddressStreet:"string",industryKey:"string",
        supplierAddressStreet1:"string",postCode:"string",city:"string",country:"string",region:"string",supplierTelephoneNumber:"string",supplierFaxNumber:"string",
        supplierEmail:"string",supplierTaxNumber:"string",supplierPaymentTerms:"string",supplierIncoTermsPart1:"string",supplierIncoTermsPart2:"string"}])
    db.url_meta_data.insert({orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"], responseMetaData:sappartsschema})

    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"supplierNumber",inputField:"vendorNumber"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"companyCode",inputField:"companyCode"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"purchaseOrg",inputField:"purchaseOrg"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"supplierName",inputField:"vendorName"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"supplierAddressStreet",inputField:"street"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"industryKey",inputField:"industryKey"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"supplierAddressStreet1",inputField:"street4"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"postCode",inputField:"postCode"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"city",inputField:"city"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"country",inputField:"countryKey"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"region",inputField:"region"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"supplierTelephoneNumber",inputField:"telephoneNumber"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"supplierEmail",inputField:"email"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"supplierTaxNumber",inputField:"taxNumber"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"supplierFaxNumber",inputField:"faxNumber"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"supplierPaymentTerms",inputField:"paymentTerms"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"supplierIncoTermsPart1",inputField:"incoTermsPart1"}])
    db.mappingstore.insert([{orgId:"buy2324950f126b",connectionId:x,zumenEndpoint:"/supplier",httpOperation:"GET",parameters:["vendornumber","purchaseorg"],outputField:"supplierIncoTermsPart2",inputField:"incoTermsPart2"}])


})
