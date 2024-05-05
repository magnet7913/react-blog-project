export function mappingArticleData(item) {
    return {
        id: item.id,
        title: item.title.rendered,
        postDate: item.date_gmt,
        category: item.categories,
        view: item.view_count,
        author: item.author_data,
        desc: item.excerpt.rendered,
        thumb: item.featured_media_url,
        slug: item.slug,
        authorId: item.author,
        content: item.content.rendered
    }
}

export function mappingCategoryData(data) {
    let tempData = data.reduce((acc, cur) => {
        acc[cur.id] = { ID: cur.id, name: cur.name }
        return acc
    }, {})
    return tempData
}



export function getQueryStr(searchStr) {
    console.log("Ha ha!")
}

export function mappingDataMenus(item) {
    const childItems = item.child_items ?? [];

    return {
        id: item.ID,
        title: item.title,
        childItems: childItems.map(mappingDataMenus)
    }
}

export function trimResult(obj, object) {
    if (Array.isArray(obj)) {
        return obj.map(item => trimResult(item, object));
    } else if (typeof obj === 'object' && obj !== null) {
        let newObj = {};
        for (let key in obj) {
            if (object.includes(key)) {
                newObj[key] = trimResult(obj[key], object);
            }
        }
        return newObj;
    } else {
        return obj;
    }
}

export function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    if (secondsPast < 60) {
        return parseInt(secondsPast) + ' giây trước';
    }
    if (secondsPast < 3600) {
        return parseInt(secondsPast / 60) + ' phút trước';
    }
    if (secondsPast <= 86400) {
        return parseInt(secondsPast / 3600) + ' giờ trước';
    }
    if (secondsPast > 86400) {
        const day = parseInt(secondsPast / 86400);
        if (day <= 30) {
            return day + ' ngày trước';
        }
        const month = parseInt(day / 30);
        if (month <= 12) {
            return month + ' tháng trước';
        }
        else {
            return parseInt(month / 12) + ' năm trước';
        }
    }
}

export function handleLogOut(){
    localStorage.removeItem('user','')
}