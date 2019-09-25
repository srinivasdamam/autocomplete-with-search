function hasMatches(suggestion) {
    return suggestion._meta.hasMatches;
}

export function transformAndFilterSuggestions (data = [], searchTerm = '') {
    const regex = new RegExp(searchTerm, 'ig');

    return data.map(item => {
        item._meta = {
            searchTerm,
            foundInItems: false,
            hasMatches: false // to identify if any matches found with search term
        };

        // matching keywords, jsx for each searchable property is stored in _highlights
        if (!item._highlights) {
            item._highlights = {};
        }

        // iterate through each property and get the matched keywords
        Object.keys(item).forEach(key => {

            // ignore _highlights, key and for if search term is empty
            if (!searchTerm || key === '_highlights' || key === '_meta') {
                return null;
            }

            const value = item[key];

            // Since we need to style highlighted keywords we need to wrap the matched keywords with html tag
            item._highlights[key] = {
                _html: value
            };

            // check if value found in array
            if (Array.isArray(value)) {
                value.forEach(element => {
                    if (regex.test(element)) {
                        item._meta.foundInItems = true;
                        item._meta.hasMatches = true;
                    }
                });
            } else {
                // get the matches and add highlight class to the matched keywords
                const matches = value.match(regex);

                if (!matches || !matches.length) {
                    return null;
                }

                if (matches.length) {
                    item._meta.hasMatches = true;
                }

                matches.forEach(match => {
                    item._highlights[key] = {
                        _html: value.replace(match, '<span class="highlight">' + match + '</span>')
                    }
                });
            }
        });
        return item;
    }).filter(hasMatches);
}