/* Informative translations. French text stays in HTML for indexing and as the source version. */
(() => {
  'use strict';
  const page = document.body.dataset.legal;
  if (!['terms','privacy'].includes(page)) return;
  const contact = '<a href="mailto:saifeddine.mabrouk@mabrouktrading.com">saifeddine.mabrouk@mabrouktrading.com</a>';
  const address = 'Avenue Hassan II, Z Ankat Abdari, Imm 3, 2ème étage, Appartement n° 9, Rabat, Maroc';
  const firm = '<strong>MABROUK TRADING SARLAU</strong> · RC <strong>203835</strong> · ICE <strong>004050246000091</strong>';
  const sections = (items) => items.map(([heading,...paras]) => '<section><h2>'+heading+'</h2>'+paras.map(p=>'<p>'+p+'</p>').join('')+'</section>').join('');
  const content = {
    en: {
      terms: {
        overline:'LEGAL INFORMATION / 01', title:'Terms &<br>conditions.',
        lead:'These terms describe how to use this website and request a quotation from MABROUK TRADING SARLAU. This is a corporate presentation website, not an online checkout.',
        items:[
          ['01 / Company details',firm+'. A Moroccan single-member limited liability company (SARLAU).','Registered office: '+address+'. Email: '+contact+'. Phone: +212 631 465 304.'],
          ['02 / Purpose of the website','This website introduces our professional equipment supply and sourcing activities in Morocco. Descriptions and imagery are informational; exact products, specifications, prices and availability are stated in individual offers.'],
          ['03 / Quotation requests','A form submission or email request is not a binding purchase order. An individual written quotation may specify products, quantities, taxes, pricing, delivery and payment. An order is governed by the accepted quotation or contract and mandatory applicable law.'],
          ['04 / Pricing and availability','Illustrations and product details may differ from available models. Prices and validity periods are binding only as specified in a written offer. Availability and timeframes may depend on manufacturers, distributors and logistics.'],
          ['05 / Orders, delivery and warranties','The accepted quotation, purchase order or contract specifies delivery, acceptance, payment, warranties and after-sales terms. Mandatory legal protections remain applicable.'],
          ['06 / Intellectual property','Original design, brand identity, copy and visual materials are protected to the extent allowed by law. Unauthorised reproduction is prohibited. Third-party trademarks belong to their owners.'],
          ['07 / Responsibility and external services','We endeavour to keep information accurate but cannot guarantee uninterrupted operation. External services, including email-form delivery and chatbot, have their own terms. No term here excludes any right that cannot legally be excluded.'],
          ['08 / Governing law','Moroccan law governs, subject to overriding mandatory provisions. Please contact us to seek an amicable resolution before approaching a competent court.','Last updated: 25 October 2026.']
        ]
      },
      privacy: {
        overline:'LEGAL INFORMATION / 02', title:'Privacy<br>policy.',
        lead:'We take the privacy of your information seriously. This policy explains how data is handled when you browse our website, request a quote, or choose to enable the chatbot.',
        items:[
          ['01 / Data controller',firm+'. Registered office: '+address+'. Data enquiries: '+contact+'.'],
          ['02 / Data and purposes','Quotation requests may include your name, company, email, optional phone number, enquiry category, references, quantities and message. We use them to answer, prepare proposals and follow up on business enquiries. Hosting services may process technical connection data to operate and protect the website.'],
          ['03 / FormSubmit form delivery','Information and optional PDF or Excel attachments (up to 2 files, 10 MB combined) are transmitted to the external FormSubmit service for delivery to our business email. The form requests consent before submission. Only submit files necessary for your enquiry, never passwords or sensitive personal information. Alternatively, contact us directly by email.'],
          ['04 / Optional ArtiBot chatbot','ArtiBot is not loaded unless you select “Enable chatbot”. If enabled, the provider may process technical data and the messages you submit. You may decline or reopen preferences in the footer. Withdrawal prevents future loading on subsequent visits but does not automatically erase information previously shared.'],
          ['05 / Recipients and international processing','Data may be received by staff handling your request and technical providers for hosting, forms, email and chat. Processing outside Morocco may occur. Relevant declarations, transfer formalities and safeguards must be assessed under Moroccan law.'],
          ['06 / Retention and protection','Requests are retained as necessary for handling enquiries, business follow-up and applicable legal duties. Access is restricted where possible and security measures are used; however, no internet transmission is completely risk-free.'],
          ['07 / Your rights','Under Moroccan Law 09-08, you may request access and correction and, where legally applicable, object to processing. Contact '+contact+'. For more information, see the <a href="https://www.cndp.ma/" target="_blank" rel="noopener noreferrer">CNDP</a>.'],
          ['08 / Preferences and changes','Your language choice and ArtiBot consent preference are saved locally on your device. Reopen “Chatbot preferences” to change your choice. We may update this policy if services or legal obligations change.','Last updated: 25 October 2026.']
        ]
      }
    },
    ar: {
      terms: {
        overline:'معلومات قانونية / 01', title:'الشروط<br>العامة.',
        lead:'توضح هذه الشروط قواعد استعمال الموقع وطلب عروض الأسعار من شركة MABROUK TRADING SARLAU. الموقع تعريفي ولا يتيح إتمام البيع مباشرة عبر الإنترنت.',
        items:[
          ['01 / بيانات الشركة',firm+'، شركة ذات مسؤولية محدودة بشريك وحيد (SARLAU) مسجلة بالمغرب.','المقر الاجتماعي: '+address+'. البريد الإلكتروني: '+contact+'. الهاتف: +212 631 465 304.'],
          ['02 / غرض الموقع','يقدم الموقع نشاط الشركة في توريد المعدات واللوازم المهنية والبحث عن الموردين في المغرب. الصور والمعلومات للتعريف؛ وتحدد العروض الخاصة المراجع والمواصفات والأسعار والتوفر.'],
          ['03 / طلبات عروض الأسعار','إرسال استمارة أو رسالة لا يعد طلب شراء ملزماً. يوضح العرض الكتابي عند الاقتضاء المنتجات والكميات والضرائب والأسعار والتسليم والأداء. تخضع الطلبات للشروط المتفق عليها والقواعد القانونية الآمرة.'],
          ['04 / الأسعار والتوفر','قد تختلف الصور والمعلومات عن الموديلات المتوفرة. لا تصبح الأسعار وآجال صلاحيتها ملزمة إلا وفق العرض المكتوب. قد يتأثر التوفر والآجال بالمصنعين والموزعين والنقل.'],
          ['05 / الطلبات والتسليم والضمان','يحدد عرض السعر المقبول أو أمر الشراء أو العقد شروط التنفيذ والتسليم والاستلام والأداء والضمان وخدمة ما بعد البيع. وتظل الحقوق والضمانات القانونية الآمرة سارية.'],
          ['06 / الملكية الفكرية','التصميم والهوية البصرية والنصوص والصور الأصلية محمية في حدود القانون. يمنع النسخ غير المأذون به، وتبقى العلامات التجارية للغير ملكاً لأصحابها.'],
          ['07 / المسؤولية والخدمات الخارجية','نسعى إلى تقديم معلومات صحيحة دون ضمان استمرار عمل الموقع دون انقطاع. تخضع خدمات استمارات البريد والمساعد الآلي لشروط مزوديها. لا يُقصد بهذه الشروط الحد من أي حق لا يجوز قانوناً التنازل عنه.'],
          ['08 / القانون المطبق','يطبق القانون المغربي، مع مراعاة الأحكام الآمرة. يرجى التواصل معنا لمحاولة حل أي خلاف ودياً قبل اللجوء إلى المحكمة المختصة قانوناً.','آخر تحديث: 25 أكتوبر 2026.']
        ]
      },
      privacy: {
        overline:'معلومات قانونية / 02', title:'سياسة<br>الخصوصية.',
        lead:'نهتم بسرية بياناتكم. توضح هذه الصفحة المعلومات التي قد تعالج عند تصفح الموقع أو طلب عرض سعر أو الموافقة على تشغيل المساعد الآلي.',
        items:[
          ['01 / المسؤول عن المعالجة',firm+'. المقر الاجتماعي: '+address+'. للتواصل بشأن البيانات: '+contact+'.'],
          ['02 / البيانات والأغراض','يمكن أن يتضمن طلب عرض السعر الاسم والشركة والبريد الإلكتروني ورقم الهاتف الاختياري ومجال الطلب والمراجع والكميات والرسالة. نستخدمها للرد وإعداد العروض ومتابعة الطلبات المهنية. وقد يعالج المستضيف بيانات اتصال تقنية لتشغيل الموقع وتأمينه.'],
          ['03 / خدمة إرسال FormSubmit','تُرسل بيانات الاستمارة وأي ملفات PDF أو Excel مرفقة اختيارياً (ملفان بحد أقصى، 10 ميغابايت في المجموع) إلى FormSubmit لتوجيهها إلى بريد الشركة. تُطلب الموافقة قبل الإرسال. لا ترسلوا كلمات المرور أو البيانات الشخصية الحساسة أو وثائق غير ضرورية للطلب. ويمكنكم التواصل بالبريد مباشرة.'],
          ['04 / مساعد ArtiBot الاختياري','لا يُحمّل ArtiBot إلا إذا اخترتم «تفعيل المساعد». عند تفعيله قد يعالج المزود بيانات تقنية والرسائل المرسلة إليه. يمكن رفض التفعيل أو إعادة فتح التفضيلات من أسفل الصفحة. يؤدي سحب الموافقة إلى منع التحميل مستقبلاً، ولا يمحو تلقائياً البيانات التي سبق إرسالها.'],
          ['05 / المتلقون والمعالجة خارج المغرب','قد تصل البيانات إلى موظفي الشركة المكلفين بالطلب وإلى مزودي الاستضافة والبريد والاستمارات والدردشة. ويمكن أن تجري بعض المعالجات خارج المغرب؛ وينبغي التحقق من التصاريح والضمانات والإجراءات اللازمة وفق القانون المغربي.'],
          ['06 / الحفظ والأمان','نحتفظ بالطلبات للفترة اللازمة لمعالجتها والمتابعة التجارية والالتزامات القانونية الواجبة. نحاول تقييد الوصول واتخاذ تدابير الحماية، مع الإقرار بأن الإنترنت لا يوفر أماناً مطلقاً.'],
          ['07 / حقوقكم','طبقاً للقانون المغربي 09-08، يمكنكم طلب الاطلاع على بياناتكم وتصحيحها، والاعتراض على بعض المعالجات وفق الشروط القانونية، عبر '+contact+'. للمزيد راجعوا <a href="https://www.cndp.ma/" target="_blank" rel="noopener noreferrer">اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي</a>.'],
          ['08 / التفضيلات والتحديثات','نحفظ اختيار اللغة والموافقة على ArtiBot محلياً في المتصفح. يمكنكم مراجعة الاختيار عبر «تفضيلات المساعد». قد نحدّث هذه السياسة عند تغير الخدمات أو المتطلبات القانونية.','آخر تحديث: 25 أكتوبر 2026.']
        ]
      }
    },
    zh: {
      terms: {
        overline:'法律信息 / 01', title:'通用<br>条款.',
        lead:'本条款说明如何使用 MABROUK TRADING SARLAU 网站以及申请报价。本站仅用于企业介绍和询价，不提供在线直接交易。',
        items:[
          ['01 / 公司资料',firm+'，摩洛哥单一股东有限责任公司（SARLAU）。','注册地址：'+address+'。电子邮箱：'+contact+'。电话：+212 631 465 304。'],
          ['02 / 网站用途','本网站介绍公司在摩洛哥提供的专业设备供应和采购寻源服务。图片与描述仅供参考，具体型号、技术规格、价格和库存以单独书面报价为准。'],
          ['03 / 报价请求','提交表单或邮件不构成具有约束力的采购订单。单独书面报价可列明产品、数量、税费、价格、交付与付款条件。订单受双方接受的报价或合同以及强制性法律规定约束。'],
          ['04 / 价格与库存','展示图片和说明可能与实际可供型号不同。价格及其有效期仅按书面报价约定生效。供货情况和交货时间可能受到厂家、经销商及物流因素影响。'],
          ['05 / 订单、交付与保修','经接受的报价、采购订单或合同将规定履约、交付、验收、付款、保修与售后条件。法定的强制性保障仍然适用。'],
          ['06 / 知识产权','原创设计、品牌标识、文字及图像在法律允许范围内受到保护。禁止未经授权的复制。第三方商标属于其各自所有者。'],
          ['07 / 责任与外部服务','我们尽力提供准确的信息，但无法保证网站始终不中断。邮件表单服务及聊天助手等外部服务适用其各自条款。本条款不排除法律禁止排除的权利。'],
          ['08 / 适用法律','本条款受摩洛哥法律管辖，但以适用的强制性规定为准。发生争议时，请先联系我们尝试友好解决，再依法向有管辖权的法院提出。','最后更新：2026年10月25日。']
        ]
      },
      privacy: {
        overline:'法律信息 / 02', title:'隐私<br>政策.',
        lead:'我们重视您的信息隐私。本政策介绍您浏览网站、申请报价或选择启用聊天助手时相关数据的处理方式。',
        items:[
          ['01 / 数据控制者',firm+'。注册地址：'+address+'。数据保护联系邮箱：'+contact+'。'],
          ['02 / 信息与用途','询价可能包含姓名、公司、邮箱、可选电话、需求类别、型号、数量与留言。我们用这些信息回复、准备报价和跟进商业需求。托管服务商还可能处理必要的技术连接数据，以运行并保护网站。'],
          ['03 / FormSubmit 表单服务','表单信息以及自愿上传的PDF或Excel附件（最多2份，总计不超过10MB）将发送给外部FormSubmit服务并转发至公司邮箱。提交前需要您同意。请仅提供报价所需文件，切勿提交密码或敏感个人信息。您也可以直接发送电子邮件。'],
          ['04 / 可选的 ArtiBot 聊天助手','只有您选择“启用助手”后，网站才会加载 ArtiBot。启用后，服务商可能处理技术信息及您发送的消息。您可以拒绝或在页脚重新打开偏好设置。撤回同意会阻止后续访问自动加载，但不会自动删除此前已传送的信息。'],
          ['05 / 接收方与跨境处理','负责处理请求的本公司人员以及托管、邮件、表单和聊天服务商可能接收相关数据。处理过程可能发生在摩洛哥境外；应依据摩洛哥法规核实所需申报、转移手续和保护措施。'],
          ['06 / 保存与安全','询价信息仅在处理需求、业务跟进及适用法律义务所必要的期限内保存。我们尽力限制访问并采取安全措施，但互联网传输无法保证绝对安全。'],
          ['07 / 您的权利','根据摩洛哥第09-08号法律，您可申请访问、纠正相关信息，并在法律允许的情况下反对某些处理。请联系 '+contact+'。更多信息参见 <a href="https://www.cndp.ma/" target="_blank" rel="noopener noreferrer">CNDP</a>。'],
          ['08 / 偏好与更新','语言偏好与 ArtiBot 授权选择保存在您的浏览器本地。可通过“聊天助手偏好”更改。我们可能因服务或法律要求变化而更新政策。','最后更新：2026年10月25日。']
        ]
      }
    }
  };
  const elements = {
    overline:document.getElementById('legal-overline'),title:document.getElementById('legal-title'),
    lead:document.getElementById('legal-lead'),content:document.getElementById('legal-content')
  };
  const original = Object.fromEntries(Object.entries(elements).map(([key,element])=>[key,element?.innerHTML||'']));
  function render(lang) {
    const data = content[lang]?.[page];
    elements.overline.innerHTML = data?.overline || original.overline;
    elements.title.innerHTML = data?.title || original.title;
    elements.lead.innerHTML = data?.lead || original.lead;
    elements.content.innerHTML = data ? sections(data.items) : original.content;
    document.title = (data ? elements.title.textContent.replace(/\s+/g,' ') : (page === 'terms' ? 'Conditions générales' : 'Politique de confidentialité')) + ' | MABROUK TRADING SARLAU';
  }
  document.addEventListener('mt-language-change', (event)=>render(event.detail.lang));
  render(window.MTI18n?.getLanguage() || 'fr');
})();
