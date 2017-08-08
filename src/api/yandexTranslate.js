export default function translate(lang){

    let text = `${this.state.lang.cloudsLabelEng}|${this.state.lang.windLabelEng}`;
    const translateApiUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
    const translateApiKey = 'trnsl.1.1.20170807T090216Z.f817b5ad504efad1.341d8f539d4785791f8952a142540ed3e0e102c0';
    //const langs = `${this.state.lang.langCode}-${lang}`;
    const langs = `en-${lang}`;
    const query = `?text=${text}&lang=${langs}&key=${translateApiKey}`;

    fetch(`${translateApiUrl}${query}`)
        .then(response => response.json() )
        .then(data => {
            let translated = data.text[0].split('|');
            //console.log(translated);
            this.setState({
                lang: {
                    langCode: lang,
                    cloudsLabel: translated[0],
                    windLabel: translated[1],
                    windLabelEng : "wind",
                    cloudsLabelEng : "cloudiness"
                }
            });
        })
        .catch(error => {console.log(error)})

}