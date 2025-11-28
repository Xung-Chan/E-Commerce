export const reset_mail_template = (user_mail: string, redirectLink: string) => `
<!DOCTYPE html> 
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title></title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass * {
      line-height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

  </style>
  <!--[if !mso]><!-->
  <style type="text/css">
    @media only screen and (max-width:480px) {
      @-ms-viewport {
        width: 320px;
      }
      @viewport {
        width: 320px;
      }
    }
  </style>
  <!--<![endif]-->
  <!--[if mso]><xml>  <o:OfficeDocumentSettings>    <o:AllowPNG/>    <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings></xml><![endif]-->
  <!--[if lte mso 11]><style type="text/css">  .outlook-group-fix {    width:100% !important;  }</style><![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (max-width:595px) {
      .container {
        width: 100% !important;
      }
      .button {
        display: block !important;
        width: auto !important;
      }
    }
  </style>
</head>

<body style="font-family: 'Inter', sans-serif; background: #E5E5E5;">
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td style="padding:48px 0 30px 0; text-align: center; font-size: 14px; color: #4C83EE;">
                  E-Commerce
                </td>
              </tr>
              <tr>
                <td class="main-content" style="padding: 48px 30px 40px; color: #000000;" bgcolor="#ffffff">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px 0; font-size: 18px; line-height: 150%; font-weight: bold; color: #000000; letter-spacing: 0.01em;">
                          Chào bạn! Quên mật khẩu?
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                          Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn: <span style="color: #4C83EE;">${user_mail}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px 0; font-size: 14px; line-height: 150%; font-weight: 700; color: #000000; letter-spacing: 0.01em;">
                          Nhấn nút bên dưới để đặt lại mật khẩu:
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px 0;">
                          <a class="button" href="${redirectLink}" title="Reset Password" style="width: 100%; background: #22D172; text-decoration: none; display: inline-block; padding: 10px 0; color: #fff; font-size: 14px; line-height: 21px; text-align: center; font-weight: bold; border-radius: 7px;">Đặt lại mật khẩu</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                          Liên kết đặt lại mật khẩu chỉ có hiệu lực trong 5 phút tới.
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 0 0 16px;">
                          <span style="display: block; width: 117px; border-bottom: 1px solid #8B949F;"></span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; line-height: 170%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                          Trân trọng, <br><strong>E-Commerce</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 24px 0 48px; font-size: 0px;">
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`
export const active_mail_template = (user_mail: string, redirectLink: string) => `
<!DOCTYPE html> 
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title></title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass * {
      line-height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

  </style>
  <!--[if !mso]><!-->
  <style type="text/css">
    @media only screen and (max-width:480px) {
      @-ms-viewport {
        width: 320px;
      }
      @viewport {
        width: 320px;
      }
    }
  </style>
  <!--<![endif]-->
  <!--[if mso]><xml>  <o:OfficeDocumentSettings>    <o:AllowPNG/>    <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings></xml><![endif]-->
  <!--[if lte mso 11]><style type="text/css">  .outlook-group-fix {    width:100% !important;  }</style><![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (max-width:595px) {
      .container {
        width: 100% !important;
      }
      .button {
        display: block !important;
        width: auto !important;
      }
    }
  </style>
</head>

<body style="font-family: 'Inter', sans-serif; background: #E5E5E5;">
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td style="padding:48px 0 30px 0; text-align: center; font-size: 14px; color: #4C83EE;">
                  E-Commerce
                </td>
              </tr>
              <tr>
                <td class="main-content" style="padding: 48px 30px 40px; color: #000000;" bgcolor="#ffffff">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px 0; font-size: 18px; line-height: 150%; font-weight: bold; color: #000000; letter-spacing: 0.01em;">
                          Chào bạn! Kích hoạt tài khoản?
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                          Chúng tôi đã nhận được yêu cầu kích hoạt tài khoản cho tài khoản của bạn: <span style="color: #4C83EE;">${user_mail}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px 0; font-size: 14px; line-height: 150%; font-weight: 700; color: #000000; letter-spacing: 0.01em;">
                          Nhấn nút bên dưới để kích hoạt tài khoản:
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px 0;">
                          <a class="button" href="${redirectLink}" title="Activate Account" style="width: 100%; background: #22D172; text-decoration: none; display: inline-block; padding: 10px 0; color: #fff; font-size: 14px; line-height: 21px; text-align: center; font-weight: bold; border-radius: 7px;">Kích hoạt tài khoản</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                          Liên kết kích hoạt tài khoản chỉ có hiệu lực trong 5 phút tới.
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 0 0 16px;">
                          <span style="display: block; width: 117px; border-bottom: 1px solid #8B949F;"></span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; line-height: 170%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                          Trân trọng, <br><strong>E-Commerce</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 24px 0 48px; font-size: 0px;">
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`
export const register_template = (redirectLink: string, template_password: string) => `

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title></title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass * {
      line-height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

  </style>
  <!--[if !mso]><!-->
  <style type="text/css">
    @media only screen and (max-width:480px) {
      @-ms-viewport {
        width: 320px;
      }
      @viewport {
        width: 320px;
      }
    }
  </style>
  <!--<![endif]-->
  <!--[if mso]><xml>  <o:OfficeDocumentSettings>    <o:AllowPNG/>    <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings></xml><![endif]-->
  <!--[if lte mso 11]><style type="text/css">  .outlook-group-fix {    width:100% !important;  }</style><![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (max-width:595px) {
      .container {
        width: 100% !important;
      }
      .button {
        display: block !important;
        width: auto !important;
      }
    }
  </style>
</head>

<body style="font-family: 'Inter', sans-serif; background: #E5E5E5;">
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td style="padding:48px 0 30px 0; text-align: center; font-size: 14px; color: #4C83EE;">
                  E-Commerce
                </td>
              </tr>
              <tr>
                <td class="main-content" style="padding: 48px 30px 40px; color: #000000;" bgcolor="#ffffff">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px 0; font-size: 18px; line-height: 150%; font-weight: bold; color: #000000; letter-spacing: 0.01em;">
                          Chào bạn! Bạn đã yêu cầu tạo tài khoản
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px 0; font-size: 14px; line-height: 150%; font-weight: bold; color: #000000; letter-spacing: 0.01em;">
                          Mật khẩu tạm thời của bạn là: <strong>${template_password}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px 0; font-size: 14px; line-height: 150%; font-weight: 700; color: #000000; letter-spacing: 0.01em;">
                          Nhấp vào nút bên dưới để tạo mật khẩu:
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px 0;">
                          <a class="button" href="${redirectLink}" title="Reset Password" style="width: 100%; background: #22D172; text-decoration: none; display: inline-block; padding: 10px 0; color: #fff; font-size: 14px; line-height: 21px; text-align: center; font-weight: bold; border-radius: 7px;">Tạo mật khẩu</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                          Liên kết tạo mật khẩu chỉ có hiệu lực trong 5 phút tới.
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 0 0 16px;">
                          <span style="display: block; width: 117px; border-bottom: 1px solid #8B949F;"></span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; line-height: 170%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                          Trân trọng, <br><strong>E-Commerce</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 24px 0 48px; font-size: 0px;">
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`

export const order_template = (data: {
  dateOrder: string,
  orderId: string,
  receiver: string
  address: string,
  items: {
    productName: string,
    variant: string,
    quantity: number,
    itemPrice: number
  }[],
  totalPrice: number,
  shippingFee: number
  discount: number
  totalPay: number
}) => {
  const receiver = data.receiver;
  const address = data.address;
  const dateOrder = new Date(data.dateOrder).toLocaleString("vi-VN");
  const orderId = data.orderId;
  const totalPrice = data.totalPrice.toLocaleString('vi-VN');
  const shippingFee = data.shippingFee.toLocaleString('vi-VN');
  const discount = data.discount.toLocaleString('vi-VN');
  const totalPay = data.totalPay.toLocaleString('vi-VN');

  let orderItems = '';
  data.items.forEach(item => {

    const productName = item.productName;
    const variant = item.variant;
    const quantity = item.quantity;
    const itemPrice = item.itemPrice.toLocaleString('vi-VN');
    orderItems += `
    <tr>
  <td align="left" class="esdev-adapt-off"
    style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:30px">
    <table cellpadding="0" cellspacing="0" class="esdev-mso-table" role="none"
      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:560px">
      <tr>
        <td class="es-m-w0" style="padding:0;Margin:0;width:20px"></td>
        <td valign="top" class="esdev-mso-td es-m-w25" style="padding:0;Margin:0">
          <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:left">
            <tr>
              <td align="center" style="padding:0;Margin:0;width:310px">
                <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                  <tr>
                    <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px">
                      <h5 class="p_name"
                        style="Margin:0;font-family:Oswald, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:normal;line-height:24px;color:#333333">
                        ${productName}/${variant}</h5>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
        <td class="es-m-w0" style="padding:0;Margin:0;width:20px"></td>
        <td valign="top" class="esdev-mso-td es-m-w25" style="padding:0;Margin:0">
          <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:left">
            <tr>
              <td align="center" style="padding:0;Margin:0;width:105px">
                <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                  <tr>
                    <td align="left" style="padding:0;Margin:0">
                      <p class="p_description"
                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#402218;font-size:14px">
                        Qty:<br>${quantity}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
        <td valign="top" class="esdev-mso-td es-m-w25" style="padding:0;Margin:0">
          <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:right">
            <tr>
              <td align="left" style="padding:0;Margin:0;width:105px">
                <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                  <tr>
                    <td align="left" style="padding:0;Margin:0">
                      <p class="p_price"
                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#402218;font-size:14px">
                        Item Price<br> ${itemPrice} VND</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`
  })
  return `
  <!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New email template 2025-11-24</title>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap" rel="stylesheet">
  <style type="text/css">
    .rollover:hover .rollover-first {
      max-height: 0px !important;
      display: none !important;
    }

    .rollover:hover .rollover-second {
      max-height: none !important;
      display: block !important;
    }

    .rollover span {
      font-size: 0px;
    }

    u+.body img~div div {
      display: none;
    }

    #outlook a {
      padding: 0;
    }

    span.MsoHyperlink,
    span.MsoHyperlinkFollowed {
      color: inherit;
      mso-style-priority: 99;
    }

    a.es-button {
      mso-style-priority: 100 !important;
      text-decoration: none !important;
    }

    a[x-apple-data-detectors],
    #MessageViewBody a {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    .es-desk-hidden {
      display: none;
      float: left;
      overflow: hidden;
      width: 0;
      max-height: 0;
      line-height: 0;
      mso-hide: all;
    }

    @media only screen and (max-width:600px) {
      .es-m-p0r {
        padding-right: 0px !important
      }

      .es-m-p20b {
        padding-bottom: 20px !important
      }

      .es-m-p0t {
        padding-top: 0px !important
      }

      .es-m-p0 {
        padding: 0px !important
      }

      .es-p-default {}

      *[class="gmail-fix"] {
        display: none !important
      }

      p,
      a {
        line-height: 150% !important
      }

      h1,
      h1 a {
        line-height: 120% !important
      }

      h2,
      h2 a {
        line-height: 120% !important
      }

      h3,
      h3 a {
        line-height: 120% !important
      }

      h4,
      h4 a {
        line-height: 120% !important
      }

      h5,
      h5 a {
        line-height: 120% !important
      }

      h6,
      h6 a {
        line-height: 120% !important
      }

      .es-header-body p {}

      .es-content-body p {}

      .es-footer-body p {}

      .es-infoblock p {}

      h1 {
        font-size: 30px !important;
        text-align: center
      }

      h2 {
        font-size: 26px !important;
        text-align: center
      }

      h3 {
        font-size: 20px !important;
        text-align: center
      }

      h4 {
        font-size: 24px !important;
        text-align: left
      }

      h5 {
        font-size: 20px !important;
        text-align: left
      }

      h6 {
        font-size: 16px !important;
        text-align: left
      }

      .es-header-body h1 a,
      .es-content-body h1 a,
      .es-footer-body h1 a {
        font-size: 30px !important
      }

      .es-header-body h2 a,
      .es-content-body h2 a,
      .es-footer-body h2 a {
        font-size: 26px !important
      }

      .es-header-body h3 a,
      .es-content-body h3 a,
      .es-footer-body h3 a {
        font-size: 20px !important
      }

      .es-header-body h4 a,
      .es-content-body h4 a,
      .es-footer-body h4 a {
        font-size: 24px !important
      }

      .es-header-body h5 a,
      .es-content-body h5 a,
      .es-footer-body h5 a {
        font-size: 20px !important
      }

      .es-header-body h6 a,
      .es-content-body h6 a,
      .es-footer-body h6 a {
        font-size: 16px !important
      }

      .es-menu td a {
        font-size: 16px !important
      }

      .es-header-body p,
      .es-header-body a {
        font-size: 16px !important
      }

      .es-content-body p,
      .es-content-body a {
        font-size: 16px !important
      }

      .es-footer-body p,
      .es-footer-body a {
        font-size: 16px !important
      }

      .es-infoblock p,
      .es-infoblock a {
        font-size: 12px !important
      }

      .es-m-txt-c,
      .es-m-txt-c h1,
      .es-m-txt-c h2,
      .es-m-txt-c h3,
      .es-m-txt-c h4,
      .es-m-txt-c h5,
      .es-m-txt-c h6 {
        text-align: center !important
      }

      .es-m-txt-r,
      .es-m-txt-r h1,
      .es-m-txt-r h2,
      .es-m-txt-r h3,
      .es-m-txt-r h4,
      .es-m-txt-r h5,
      .es-m-txt-r h6 {
        text-align: right !important
      }

      .es-m-txt-j,
      .es-m-txt-j h1,
      .es-m-txt-j h2,
      .es-m-txt-j h3,
      .es-m-txt-j h4,
      .es-m-txt-j h5,
      .es-m-txt-j h6 {
        text-align: justify !important
      }

      .es-m-txt-l,
      .es-m-txt-l h1,
      .es-m-txt-l h2,
      .es-m-txt-l h3,
      .es-m-txt-l h4,
      .es-m-txt-l h5,
      .es-m-txt-l h6 {
        text-align: left !important
      }

      .es-m-txt-r img,
      .es-m-txt-c img,
      .es-m-txt-l img {
        display: inline !important
      }

      .es-m-txt-r .rollover:hover .rollover-second,
      .es-m-txt-c .rollover:hover .rollover-second,
      .es-m-txt-l .rollover:hover .rollover-second {
        display: inline !important
      }

      .es-m-txt-r .rollover span,
      .es-m-txt-c .rollover span,
      .es-m-txt-l .rollover span {
        line-height: 0 !important;
        font-size: 0 !important;
        display: block
      }

      .es-spacer {
        display: inline-table
      }

      a.es-button,
      button.es-button {
        font-size: 20px !important;
        padding: 10px 20px 10px 20px !important;
        line-height: 120% !important
      }

      a.es-button,
      button.es-button,
      .es-button-border {
        display: block !important
      }

      .es-m-fw,
      .es-m-fw.es-fw,
      .es-m-fw .es-button {
        display: block !important
      }

      .es-m-il,
      .es-m-il .es-button,
      .es-social,
      .es-social td,
      .es-menu.es-table-not-adapt {
        display: inline-block !important
      }

      .es-adaptive table,
      .es-left,
      .es-right {
        width: 100% !important
      }

      .es-content table,
      .es-header table,
      .es-footer table,
      .es-content,
      .es-footer,
      .es-header {
        width: 100% !important;
        max-width: 600px !important
      }

      .adapt-img {
        width: 100% !important;
        height: auto !important
      }

      .es-adapt-td {
        display: block !important;
        width: 100% !important
      }

      .es-mobile-hidden,
      .es-hidden {
        display: none !important
      }

      .es-container-hidden {
        display: none !important
      }

      .es-desk-hidden {
        width: auto !important;
        overflow: visible !important;
        float: none !important;
        max-height: inherit !important;
        line-height: inherit !important
      }

      tr.es-desk-hidden {
        display: table-row !important
      }

      table.es-desk-hidden {
        display: table !important
      }

      td.es-desk-menu-hidden {
        display: table-cell !important
      }

      .es-menu td {
        width: 1% !important
      }

      table.es-table-not-adapt,
      .esd-block-html table {
        width: auto !important
      }

      .h-auto {
        height: auto !important
      }
    }

    @media screen and (max-width:384px) {
      .mail-message-content {
        width: 414px !important
      }
    }
  </style>
</head>

<body class="body"
  style="width:100%;height:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#C68B59"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#C68B59"></v:fill>
			</v:background>
		<![endif]-->
    <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper" role="none"
      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#C68B59">
      <tr>
        <td valign="top" style="padding:0;Margin:0">
          <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;table-layout:fixed !important">
            <tr>
              <td align="center" style="padding:0;Margin:0">
                <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-content-body"
                  role="none"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;background-color:#FFFFFF;width:600px">
                  <tr>
                    <td align="left" bgcolor="#C5B6AA" style="padding:20px;Margin:0;background-color:#c5b6aa">
                      <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:472px" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:left">
                        <tr>
                          <td align="center" valign="top" class="es-m-p20b" style="padding:0;Margin:0;width:472px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <h1
                                    style="Margin:0;font-family:Oswald, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:40px;font-style:normal;font-weight:bold;line-height:48px;color:#402218">
                                    ORDER INFO</h1>
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#402218;font-size:14px;display:none">
                                    <br>
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!--[if mso]></td><td style="width:20px"></td><td style="width:68px" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:right">
                        <tr>
                          <td align="left" style="padding:0;Margin:0;width:68px">
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left"
                      style="Margin:0;padding-right:20px;padding-left:20px;padding-top:30px;padding-bottom:30px">
                      <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:left">
                        <tr>
                          <td align="left" class="es-m-p20b" style="padding:0;Margin:0;width:270px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <h3
                                    style="Margin:0;font-family:Oswald, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:24px;color:#402218">
                                    Order Date&nbsp;</h3>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0;padding-top:10px">
                                  <p class="es-m-txt-c"
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#402218;font-size:14px">
                                    ${dateOrder}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:right">
                        <tr>
                          <td align="left" style="padding:0;Margin:0;width:270px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                              <tr>
                                <td align="left" style="padding:0;Margin:0;padding-top:0px">
                                  <h3
                                    style="Margin:0;font-family:Oswald, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:24px;color:#402218">
                                    Shipped To</h3>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0;padding-top:10px">
                                  <p class="es-m-txt-c"
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#402218;font-size:14px">
                                    ${receiver}</p>
                                  <p class="es-m-txt-c"
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#402218;font-size:14px">
                                    ${address}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table><!--[if mso]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;table-layout:fixed !important">
            <tr>
              <td align="center" style="padding:0;Margin:0">
                <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-content-body"
                  role="none"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;background-color:#FFFFFF;width:600px">
                  <tr>
                    <td align="left" bgcolor="#C5B6AA" style="padding:20px;Margin:0;background-color:#c5b6aa">
                      <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:472px" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:left">
                        <tr>
                          <td align="center" valign="top" class="es-m-p20b" style="padding:0;Margin:0;width:472px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <h1
                                    style="Margin:0;font-family:Oswald, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:40px;font-style:normal;font-weight:bold;line-height:48px;color:#402218">
                                    ITEMS SHIPPED</h1>
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#402218;font-size:14px;display:none">
                                    <br>
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!--[if mso]></td><td style="width:20px"></td><td style="width:68px" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:right">
                        <tr>
                          <td align="left" style="padding:0;Margin:0;width:68px">
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:20px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                        <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <h2
                                    style="Margin:0;font-family:Oswald, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:bold;line-height:28.8px;color:#402218">
                                    Order Number: ${orderId}</h2>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- orderItems -->
                  ${orderItems}
                 
                  <tr>
                    <td align="left" bgcolor="#C5B6AA" style="padding:20px;Margin:0;background-color:#c5b6aa">
                      <table cellpadding="0" cellspacing="0" width="100%" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                        <tbody>
                          <tr>
                            <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                              <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="left" style="padding:0;Margin:0">
                                      <h2
                                        style="Margin:0;font-family:Oswald, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:bold;line-height:28.8px;color:#402218">
                                        PURCHASE SUMMARY</h2>
                                      <p
                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#402218;font-size:14px;display:none">
                                        <br>
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" class="esdev-adapt-off"
                      style="Margin:0;padding-right:20px;padding-left:20px;padding-top:30px;padding-bottom:20px">
                      <table cellpadding="0" cellspacing="0" class="esdev-mso-table" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:560px">
                        <tbody>
                          <tr>
                            <td valign="top" class="esdev-mso-td es-m-w50" style="padding:0;Margin:0">
                              <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:left">
                                <tbody>
                                  <tr>
                                    <td align="center" style="padding:0;Margin:0;width:435px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0">
                                              <p class="es-m-txt-l"
                                                style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#402218;font-size:14px">
                                                Subtotal:
                                                <br>Shipping:
                                              </p>
                                              <p class="es-m-txt-l"
                                                style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#402218;font-size:14px">
                                                Discount:</p>
                                              <h3 class="es-m-txt-l"
                                                style="Margin:0;font-family:Oswald, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:24px;color:#402218">
                                                Order Total:</h3>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td style="padding:0;Margin:0;width:20px"></td>
                            <td valign="top" class="esdev-mso-td es-m-w50" style="padding:0;Margin:0">
                              <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:right">
                                <tbody>
                                  <tr>
                                    <td align="left" style="padding:0;Margin:0;width:200px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0">
                                              <p class="p_price"
                                                style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#402218;font-size:14px">
                                                ${totalPrice} VND<br>
                                                ${shippingFee} VND<br>
                                                ${discount} VND</p>
                                              <h3 class="p_price"
                                                style="Margin:0;font-family:Oswald, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:24px;color:#402218">
                                                ${totalPay} VND<br></h3>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table cellpadding="0" cellspacing="0" align="center" class="es-footer" role="none"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr>
              <td align="center" style="padding:0;Margin:0">
                <table align="center" cellpadding="0" cellspacing="0" bgcolor="#ffffff" class="es-footer-body"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;background-color:#ffffff;width:600px"
                  role="none">
                  <tr>
                    <td align="left"
                      style="Margin:0;padding-right:20px;padding-left:20px;padding-top:20px;padding-bottom:20px">
                      <table cellpadding="0" cellspacing="0" width="100%" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                        <tr>
                          <td align="left" style="padding:0;Margin:0;width:560px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                              <tr>
                                <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#402218;font-size:12px">
                                    You are receiving this email because you have visited our site or asked us about the
                                    regular newsletter. Make sure our messages get to your Inbox (and not your bulk or
                                    junk folders).<br><strong><a target="_blank" href="https://viewstripo.email"
                                        style="mso-line-height-rule:exactly;text-decoration:underline;color:#402218;font-size:12px">Privacy
                                        police</a> | <a target="_blank"
                                        style="mso-line-height-rule:exactly;text-decoration:underline;color:#402218;font-size:12px"
                                        href="">Unsubscribe</a></strong></p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none"
      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;table-layout:fixed !important">
      <tbody>
        <tr>
          <td align="center" style="padding:0;Margin:0">
            <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-content-body" role="none"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;background-color:#FFFFFF;width:600px">
              <tbody>
                <tr>
                  <td align="left" style="padding:0;Margin:0">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                      <tbody>
                        <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td align="center" style="padding:0;Margin:0;font-size:0px"><img
                                      src="https://fwqalki.stripocdn.email/content/guids/CABINET_f9a1aa031b0165640302dd0498af20c9/images/71311626942018157.png"
                                      alt="" width="600" class="adapt-img"
                                      style="display:block;font-size:14px;border:0;outline:none;text-decoration:none;margin:0">
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="left" style="padding:0;Margin:0">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                      <tbody>
                        <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td align="center" style="padding:0;Margin:0;font-size:0px"><img
                                      src="https://fwqalki.stripocdn.email/content/guids/CABINET_f9a1aa031b0165640302dd0498af20c9/images/20691626942159128.png"
                                      alt="" width="600" class="adapt-img"
                                      style="display:block;font-size:14px;border:0;outline:none;text-decoration:none;margin:0">
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>

</html>
  `
}