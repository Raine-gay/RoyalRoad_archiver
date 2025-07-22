if (is_novel_index_page()) {
    add_archival_buttons();
}

/**
 * Checks if the current webpage is a webnovel index page.
 * 
 * This is worked out by checking for the existence of the following meta tag:
 * `<meta property="og:type" content="books.book">`
 */
function is_novel_index_page() {
    let meta_tags = document.head.getElementsByTagName('meta');

    for (let i = 0; i < meta_tags.length; i+=1) {
        if (meta_tags[i].getAttribute("property") == "og:type") {
            if (meta_tags[i].getAttribute("content") == "books.book") { return true; }
        }
    }

    return false;
}

/**
 * Adds the archival buttons and any options to the webnovel index page.
 */
function add_archival_buttons() {
    let page_content_div = document.getElementsByClassName("page-content-inner")[0];

    let archival_buttons_div = document.createElement("div");
    archival_buttons_div.id = "archival_buttons_div";

    let begin_archival_button = document.createElement("button");
    begin_archival_button.id = "begin_archive_button";
    begin_archival_button.innerText = "Begin archival!"
    begin_archival_button.addEventListener("click", () => { begin_archival() });
    archival_buttons_div.appendChild(begin_archival_button);

    page_content_div.insertAdjacentElement("afterbegin", archival_buttons_div);
}

/**
 * Begins the archival process using the options set in the archival_buttons_div.
 * (If there are any options to be set.)
 */
function begin_archival() {
    
}