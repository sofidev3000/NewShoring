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