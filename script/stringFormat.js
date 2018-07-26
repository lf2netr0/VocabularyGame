String.prototype.format = function ()
    {
        var txt = this.toString();
        for (var i = 0; i < arguments.length; i++)
        {
            var exp = getStringFormatPlaceHolderRegEx(i);
            txt = txt.replace(exp, (arguments[i] == null ? "" : arguments[i]));
        }
        return cleanStringFormatResult(txt);
    }
    function getStringFormatPlaceHolderRegEx(placeHolderIndex)
    {
        return new RegExp('({)?\\{' + placeHolderIndex + '\\}(?!})', 'gm')
    }
    //當format格式有多餘的position時，就不會將多餘的position輸出
    //ex:
    // var fullName = 'Hello. My name is {0} {1} {2}.'.format('firstName', 'lastName');
    // 輸出的 fullName 為 'firstName lastName', 而不會是 'firstName lastName {2}'
    function cleanStringFormatResult(txt)
    {
        if (txt == null) return "";
        return txt.replace(getStringFormatPlaceHolderRegEx("\\d+"), "");
    }