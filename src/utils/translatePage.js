// const htmlTags = [
//     "h1",
//     "h2",
//     "h3",
//     "h4",
//     "h5",
//     "h6",
//     "p",
//     "span",
//     "strong",
//     "em",
//     "b",
//     "small",
//     "mark",
//     "blockquote",
//     "cite",
//     "textarea",
//     "button",
//     "a",
//     "input",
//     "sup",
//     "sub",
//     "label"
//     // "time",
//     // "ol",
//     // "li",
//     // "i",
//     // "del",
//     // "ins",
//     // "ul",
//     // "q",
//     // "abbr",
//     // "code",
// ];

// // 1>> Obtener elementos del html
// const getElements = () => {
//     const tagsHtml = htmlTags.map(tag => {
//         return Array.from(document.querySelectorAll(tag));
//     });
//     const tagsOneArrLevel = tagsHtml.flat();
//     return tagsOneArrLevel;
// }

// const checkChilds = (element) => {
//     /*
//         Solo busca un nodo de texto a primer nivel... si no encuentra, descarta el elemento
//         1 >= button
//                 svg
//                 #text (si)

//         2 >= li
//                h2 
//                  #text (no, porque ya debio ser tomado al buscar por etiquetas h2)
//                span
//                #text (si)
//     */

//                console.log('TODOS ==> ',element.outerText.trim());

//                const hasText = Array.from(element.childNodes).some(c => c.nodeName == "#text");
//             //    console.log('CON TEXTO ==>', hasTextArr);
//                if (hasText) {
//                 return element
//                }



// }

// // 2>> eliminar los que sean null, undefined, tengan valores, texto vacío, checkbox, radiobuttons
// const elementsCleaner = (elementsHtmtl) => {

//     if (!elementsHtmtl) {
//         return;
//     }

//     const invalidTag = {
//         'checkbox': 'checkbox',
//         'radio': 'radio',

//     };


//     const dataTag = {
//         tagName: '',
//         type: '',
//         textContent: '',
//         placeholder: '',
//         value: '',
//         idxNodeText: null,
//         element: null,
//     };

//     // ELIMINAND TAGS Y AQUELLOS CON CHILDREN
//     let counterbtn = 0;
//     const filterElements = elementsHtmtl.filter(tag => {
//         const tagName = tag.tagName.toLowerCase();
//         const childrens = Array.from(tag.children);


//         // if (childrens.length > 0 && tagName == 'button') {
//         //     const a = checkChilds(tag);
//         //     counterbtn++
//         //     console.log('LLEGAN => ', counterbtn);

//         // }

//         // return

//         if (
//             !invalidTag[tag.type] 
//             && 
//             // (childrens <= 0 || tagName == 'button')
//             childrens <= 0
//         ) {
//             return tag;
//         }
//     });


//     const newElements = filterElements.map((tag, idx) => {
//         const tagName = tag.tagName.toLowerCase();
//         // console.log({tag: tagName, e: tag, textContent: tag.textContent.trim(), childrens: Array.from(tag.children) });

//             dataTag.element = tag;
//             dataTag.type = tag.type;
//             dataTag.tagName = tagName;

//             if (tagName == 'input') {
//                     dataTag.placeholder = tag.placeholder.trim();
//                     dataTag.textContent = tag.textContent.trim();
//                     dataTag.value = tag.value.trim();
//             }
//             else { // cualquier otro tag... 
//                 if (tag.textContent.trim() !== '') {
//                     dataTag.textContent = tag.textContent.trim();
//                 }
//             }

//             return {...dataTag};

//     });    

//     return newElements;   

//  }

//  // 3 consultar api de traducción...

// const translateElements = ({elements, lang}) => {
//     console.log(elements);

//     // TODO: VALOR DE e EN MAP de abajo
//     // dataTag = {
//     //     tagName: '',
//     //     textContent: '',
//     //     placeholder: '',
//     //     value: '', // para los inputs pero inicialmente no cuenta con valor
//     //     type: '',
//     //     element: null,
//     // };
//     const makeArr = elements.map(e => {
//         if (e.tagName == 'input') {
//             return e.placeholder;
//         }
//         else if (e.tagName == 'button') {
//             return e.element.outerText
//         }
//         else {
//             return e.textContent;
//         }
//     });

//     console.log(makeArr);

//     // simular cambios de idioma...
//     const news = makeArr.map((m, idx) => {
//         const t = m.split('->');


//         return t[0] + '-> ' + idx + ': ' + lang;

//     });

//     const news2 = elements.map((e, idx) => {
//         const valTrasnlate = news[idx];

//         if (e.tagName == 'input') {
//             e.element.placeholder = valTrasnlate;
//         }
//         else {
//             e.element.textContent = valTrasnlate
//         }
//     });

// }

// const initProcessTranslate = (lang= '') => {

//     let l = lang;
//     if (!lang) {
//         l = JSON.parse(localStorage.getItem('selectedLanguage'));
//         l = l.code;
//     }

//     const elements = getElements();
//     const cleanElements = elementsCleaner(elements);
//     translateElements({elements: cleanElements, lang: l});
// }




const initProcessTranslate = () => {
    const scripTag = document.createElement('script');
    scripTag.setAttribute('src', '/src/utils/gtranslate2.js');
    scripTag.setAttribute('defer', '');
    scripTag.setAttribute('id', 'langScript');


    const scripTagContent = document.createElement('script');
    scripTagContent.setAttribute('id', 'LangScriptConfig');


    // "default_language": "es",
    scripTagContent.textContent = `
    window.gtranslateSettings = {
        "detect_browser_language":true,
        "languages":["en","fr", "de","es","zh-CN", "ru"],
        "alt_flags":{"en": "usa", "es":"mexico"},
        "wrapper_selector":".gtranslate_wrapper",
        "switcher_horizontal_position":"right",
        "switcher_vertical_position":"top",
        "flag_style":"3d"
        }
        `;

    if (!document.getElementById('langScript')) {
        document.body.appendChild(scripTag);
    }

    if (!document.getElementById('LangScriptConfig')) {
        document.body.appendChild(scripTagContent);
    }
}
export { initProcessTranslate };