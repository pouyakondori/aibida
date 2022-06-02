export enum AppLoadingMessages {
    Loading = 'Loading...',
    Error = 'Could not load data. Please try again later.',
}

export enum Columns {
    DelivererCode = 'DelivererCode',
    DelivererName = 'DelivererName',
    ProductName = 'ProductName',
    RecipientCode = 'RecipientCode',
    RecipientName = 'RecipientName',
    TransactionObjectName = 'TransactionObjectName',
    TransactionTypeName = 'TransactionTypeName',
    Value = 'Value',
}

export enum TransactionsColumnsSet {
    None,
    ConfigurableColumns,
    SupplyChains,
    ArmsLengthValidations,
    FinancialData,
    TransactionsAdd,
    IntangibleAgreements,
    ResponsibilityRoleRelated,
}

export enum ActionNames {
    Create = 'CREATE',
    Update = 'UPDATE',
    Delete = 'DELETE',
}

export enum DateConversions {
    ToYearLast,
    ToYearFirst,
}

export enum DataAreas {
    ContributionAndBA = 'ContributionsAndBusinessActivities',
    EntityDescription = 'EntityDescription',
    FinancialAccount = 'LegalEntityFinancialStatement',
    GeographicalMarket = 'LegalEntityGeographicalMarket',
    LocalProfitLoss = 'LegalEntityLocalProfitLoss',
    MainMarket = 'LegalEntityMainCustomersAndCompetitors',
    MainProductGroup = 'LegalEntityMainProductGroup',
    ManagementStructure = 'LegalEntityManagementStructure',
    Ownership = 'Ownership',
}

export enum EntityIdentifierModes {
    Name = 'Name',
    Code = 'ID',
}

export enum ErrorMessageActions {
    Fetch = 'retrieving',
    Upsert = 'saving',
    Delete = 'removing',
}

export enum MaximumFileSize {
    // KB == MB x 1024, byte == KB x 1024
    MB = 20,
    KB = 20480,
    byte = 20971520,
}

export enum OwnershipTypes {
    OwnedLegalEntity = 'Owned Legal Entity',
    Shareholder = 'Shareholder',
}

export enum ProfitLossAccounts {
    Sales = 1,
    COGS,
    OPEX,
}

export enum SnackbarTypes {
    Info = 'Info',
    Error = 'Error',
}

export enum Statuses {
    Initial = 'Initial',
    InProgress = 'InProgress',
    Completed = 'Completed',
}

export enum StructureModes {
    Entity = 'Entity',
    Group = 'Group',
}

export enum TabEvents {
    Refresh = 'tabs-refreshed',
}

export enum TransactionDirectionType {
    InternalTransaction = 'Internal',
    ExternalSalesTransaction = 'ExternalSales',
    ExternalPurchaseTransaction = 'ExternalPurchase',
}

export enum PersistentStateIds {
    BusinessLines = 'BusinessLines',
    FinancialStatements = 'FinancialStatements',
    LegalEntities = 'LegalEntities',
    MainCustomers = 'MainCustomers',
    MainCompetitors = 'MainCompetitors',
    ManagementStructure = 'ManagementStructure',
    FinancialAccounts = 'FinancialAccounts',
    BusinessRestructurings = 'BusinessRestructurings',
    CentralFinancingEntities = 'CentralFinancingEntities',
    FinancingArrangements = 'FinancingArrangements',
    BusinessProfitDrivers = 'BusinessProfitDrivers',
    IntangibleAssets = 'IntangibleAssets',
    IntangibleCategories = 'IntangibleCategories',
    IntangibleAgreements = 'IntangibleAgreements',
    IntangibleTransfers = 'IntangibleTransfers',
    FinancingTPPolicies = 'FinancingTPPolicies',
    TPPolicies = 'TPPolicies',
    TPDocumentationEntities = 'TPDocumentationEntities',
    MapTransactions = 'MapTransactions',
    AddInternalTransactions = 'AddInternalTransactions',
    AddExternalSalesTransactions = 'AddExternalSalesTransactions',
    AddExternalPurchaseTransactions = 'AddExternalPurchaseTransactions',
    Validations = 'Validations',
    SupplyChains = 'SupplyChains',
    Benchmarks = 'Benchmarks',
    Definitions = 'Definitions',
    LegalAgreements = 'LegalAgreements',
    Methods = 'Methods',
    Rulings = 'Rulings',
    ServiceArrangements = 'ServiceArrangements',
    ServiceLocations = 'ServiceLocations',
    Contributions = 'Contributions',
    RoleMapping = 'RoleMapping',
    TPModels = 'TPModels',
    ArmsLengthValidations = 'ArmsLengthValidations',
    PLISvaluesAndFinancialData = 'PLISvaluesAndFinancialData',
    FinancialData = 'FinancialData',
    DescriptionOfMarkets = 'DescriptionOfMarkets',
}

export enum ArmsLengthValidationFilter {
    All,
    OutOfRange,
    MissingValues,
}

export enum OptionalDataAreas {
    BusinessRestructuring = 'BusinessRestructuring',
    FinancingArrangement = 'FinancingArrangement',
    IntangibleAsset = 'IntangibleAsset',
    IntangibleTransfer = 'IntangibleTransfer',
}
