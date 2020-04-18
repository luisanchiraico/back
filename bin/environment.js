'use strict'

module.exports = {
    PORT: 3000,
    DB: {
        host:  '146.71.76.148',
        port:  3357,
        user:  'user',
        password:  'TPBEC#]ks6Xg',
        database:  'dbintegrado',
        multipleStatements: true
    },
    AMAZON_BUCKET_URL:  'https://s3-us-west-2.amazonaws.com/fitco-storage/',
    AMAZON_FOLDER_NAME: {
        stockVoucher: 'stockVoucher/',
        userDocuments: 'userDocuments/',
        brandedWebs: 'brandedWebs/',
        landingOrganization: 'landingOrga/',
        profiles: 'profiles/',
        logos: 'logos/',
        plan: 'plans/',
        fitcoUser: 'fitcoUser/',
        logos_test: 'logos-develop/',
        salesInvoice: 'sales-invoice/'
    }
}