import { useState, useEffect } from 'react';
type codesT = 'fr' | 'es' | 'en' | 'ru' | 'zh' | 'de';

// rs => ru => ruso
// cn => zh => chino
// de => aleman

type langInfoT = {
    code: codesT;
    flag: string;
    name: string;
};
// types del response del systran api
type outputItemT = {
    output: string;
  }
type outputsT = {
    outputs: outputItemT[];
  }
type propsT = {
    text: string;
}


const TranslateText: React.FC<propsT> = ({text}) => {
    const [translatedText, setTranslatedText] = useState<string>(text);
   
    const getCurrentLang = (): codesT=> {
        let lang: langInfoT;
    
        if (typeof window !== "undefined") {
            // Ahora puedes usar localStorage de manera segura
            lang = JSON.parse(localStorage.getItem('selectedLanguage')) as langInfoT;
            
            if (lang) {
                return lang.code;
            }
            return 'es'; // por defecto...
          }
        return 'es'; // por defecto...
    }
    
    const translateTextInit = async ({text}) => {
        return setTranslatedText(text);
        
        let newText: string = text;
        const keySystran = '4c820b77-e95b-48c0-9283-470a13268ed3';
        const urlApi = `https://api-translate.systran.net/translation/text/translate?key=${keySystran}`;
    
        const code = getCurrentLang();

        if (!text || !code) {
            return text;
        }
    
        // TODO: NO se puede mandar un texto y su target del idioma del texto... 
        // text: 'hola' , target: 'es' => esta da un 500... 
        // text: 'hello', target: 'en => esto da un 500
        // TODO: FALTA UNA PROP QUE INDIQUE CUAL FUE EL TEXTO ANTERIOR AL SELECCIONADO O ALGO ASÍ... 
        // TODO: HACER ESE SET AL MOMENTO DE CAMBIAR DE IDIOMA...
        
        const data = {
            input: text,
            target: code
            // source: '',
        };
    
        const response = await fetch(urlApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        })
    
        if (!response.ok) {
            // throw new Error('Error en la red: ' + response.status);
            console.log('translation error ==> ', response.status, await response.json());
            newText = text; // la variable que llega... para que no truene la api y evitamos tirar la página si falla alguna traducción... un error puede ser el 500 mencionado arriba... en el TODO
        }
        const responseText = await response.json() as outputsT;
        newText = responseText.outputs[0].output;
        
        return setTranslatedText(newText);
    }
    
    useEffect(() => {
        translateTextInit({text});
    }, [text]);

   return <>{translatedText}</>
};

export default TranslateText;