const initProcessTranslate = () => {
    const scripTag = document.createElement('script');
    //scripTag.setAttribute('src', '/src/utils/gtranslate2.js');
    scripTag.setAttribute('src', '/libs/js/gtranslate2.js');
    scripTag.setAttribute('defer', '');
    scripTag.setAttribute('id', 'langScript');


    const scripTagContent = document.createElement('script');
    scripTagContent.setAttribute('id', 'LangScriptConfig');


    scripTagContent.textContent = `
    window.gtranslateSettings = {
         "default_language": "es",
        "detect_browser_language":true,
        "languages":["en","fr", "de","es","zh-CN", "ru", "ar"],
        "alt_flags":{"en": "usa", "es":"mexico"},
        "wrapper_selector":".gtranslate_wrapper",
        "switcher_horizontal_position":"right",
        "switcher_vertical_position":"top",
        "flag_style":"3d",
        "url_structure": "none"
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