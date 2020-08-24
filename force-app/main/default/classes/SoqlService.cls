public without sharing class SoqlService {
    private String objectName;
    private String fields;
    private Integer offset;
    private Integer limitOfQuery;
    private String searchName;

    public SoqlService(String objectName) {
        this.objectName = objectName;
    }

    public SoqlService setFields(List<String> fields) {
        this.fields = String.join(fields, ', ');
        return this;
    }

    public SoqlService setOffset(Integer offset) {
        this.offset = offset;
        return this;
    }

    public SoqlService setLimit(Integer limitOfQuery) {
        this.limitOfQuery = limitOfQuery;
        return this;
    }

    public SoqlService setSearchName(String searchName) {
        this.searchName = searchName;
        return this;
    }

    public List<SObject> doSoql() {
        String query = 'SELECT ' + this.fields + ' FROM ' + this.objectName;

        if (String.isNotBlank(searchName)) {
            query += ' WHERE Name LIKE \'%' + this.searchName + '%\'';
        }

        query += ' LIMIT ' + this.limitOfQuery + ' OFFSET ' + this.offset;

        return Database.query(query);
    }

    public Integer getAmountOfRecords() {
        String query = 'SELECT COUNT() FROM ' + this.objectName;
        
        if (String.isNotBlank(searchName)) {
            query += ' WHERE Name LIKE \'%' + this.searchName + '%\'';
        }

        return Database.countQuery(query);
    }
}
