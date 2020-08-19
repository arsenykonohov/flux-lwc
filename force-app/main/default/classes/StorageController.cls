public without sharing class StorageController {
    private static final List<String> columnData = new List<String>{
            'Name',
            'Phone',
            'Fax',
            'Email',
            'Department',
            'Birthdate'
    };

    @AuraEnabled
    public static Response getContacts(ParamsWrapper params){
        SoqlService soql = new SoqlService('Contact');
        soql.setFields(columnData);
        soql.setLimit(params.pageSize);
        soql.setOffset(params.pageSize * params.currentPage);

        Response resp = new Response();
        resp.amountOfRecords = soql.getAmountOfRecords();
        resp.columnData = columnData;
        resp.cellsData = (List<Contact>)soql.doSoql();

        return resp;
    }

    public class ParamsWrapper {
        @AuraEnabled public Integer pageSize { get; set; }
        @AuraEnabled public Integer currentPage { get; set; }
    }

    public class Response {
        @AuraEnabled public Integer amountOfRecords { get; set; }
        @AuraEnabled public List<Contact> cellsData { get; set; }
        @AuraEnabled public List<String> columnData { get; set; }
    }
}
