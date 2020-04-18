const services = require('../services');
const config = require('../bin/config');
const sg = require('sendgrid')(config.environment.SEND_GRID.key);
const headers = {
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'authorization': 'Bearer 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'
};

function sendSaleInvoice(data) {
    let template = config.sendGridTemplete.salesInvoice
    let personalizations = [
        {
            to: [
                {
                    email: data.email
                }
            ],
            subject: 'Confirmación de pago',
            substitutions: {
                "$clientName": data.completeName,
                "$voucher": data.url,
                "$logo": config.environment.AMAZON_BUCKET_URL+config.environment.AMAZON_FOLDER_NAME.logos+'logo-'+data.establishmentId+'.png',
                "$establishmentName": data.establishmentName
            }
        }
    ]


    let body = {
        personalizations: personalizations
        ,
        from: {
            email: 'noreply@fitcolatam.com',
            name: data.establishmentName
        },
        content: [
            {
                type: 'text/html',
                value: ' '
            }
        ],
        template_id: template
    };
    let request = sg.emptyRequest({
        method: 'POST',
        path: config.environment.SEND_GRID.url,
        body: body,
        headers: headers
    });
    
    sg.API(request, function (error, response) {
        if (error) {
            console.error(JSON.stringify(error));
        }
    });
}

module.exports = {
    sendSaleInvoice
}