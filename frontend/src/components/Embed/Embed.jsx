import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const Embed = ({ content }) => {

    // Sanitize HTML input before rendering it on the page
    // Allowedtags and attributes is what html is allowed and will go through sanitizing;
    // If it's not on the list, it will not be rendered - 
    // so add the tags and attributes you want to allow to the arrays below.

    let dirty = marked(content);
    const clean = sanitizeHtml(dirty, {
        allowedTags: ['iframe'],
        allowedAttributes: {
            'iframe': ['src', 'width', 'height', 'style'],
        },
        // allowedIframeHostnames: ['www.google.com'],
    });

    return (
        <div dangerouslySetInnerHTML={{ __html: clean }}></div>
    );
};

export default Embed;