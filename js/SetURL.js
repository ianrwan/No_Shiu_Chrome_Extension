class SetURL
{
    url;

    constructor(url)
    {
        this.setURL(url)
    }

    getURL()
    {
        if(this.url == undefined)
            return;
        return this.url;
    }

    setURL(url)
    {
        let temp = "";
        temp = url;
        
        if(!temp.includes("https://www.youtube.com"))
            return;

        if(temp.includes("&"))
        {
            var num = temp.indexOf("&");
            temp = temp.substring(0, num);
        }

        if(temp.includes("watch?v="))
        {
            let cut = "watch?v="
            var index = temp.indexOf(cut);
            temp = temp.substring(0, index)+"embed/"+temp.substring(index+cut.length, temp.length);
        }
           

        this.url = temp;
    }
}