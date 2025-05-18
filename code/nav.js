link_ids = ["link_index", "link_news", "link_Fuksi", "link_Membership", "link_Board", "link_calendar", "link_index-en", "link_news-en", "link_Fuksi-en", "link_Membership-en", "link_Board-en", "link_calendar-en"]
page_ids = ["page_index", "page_news", "page_Fuksi", "page_Membership", "page_Board", "page_calendar", "page_index-en", "page_news-en", "page_Fuksi-en", "page_Membership-en", "page_Board-en", "page_calendar-en"]
function update_nav(){
    console.log("Loaded");
    // Figure what page we're on from the pathname
    const page_id = document.getElementsByTagName("body")[0].id;
    const page_name = page_id.split("_")[1];
    console.log(page_id.split("_"))
    const link_id = "link_" + page_name;
    // Remove 'active' and 'aria-current' from all link elements
    for (let i = 0; i < link_ids.length; i++) {
        const nav_link = document.getElementById(link_ids[i]);
        if (nav_link != null) {
            nav_link.classList.remove("active");
            nav_link.ariaCurrent=null;
        }
    }
    // Add 'active' and aria-current to correct link
    console.log(link_id)
    const add_link = document.getElementById(link_id);
    add_link.classList.add("active");
    add_link.ariaCurrent="page";
}
