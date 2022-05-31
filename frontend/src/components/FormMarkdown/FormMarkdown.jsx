import MainContainer from '../MainContainer/MainContainer';
import ReactMarkDown from 'react-markdown';

import React from 'react';

const { API_URL } = process.env;

const FormMarkdown = ({
  content,
  backgroundColor = '#FFF',
  fontColor = '#000',
}) => {
  function data(contentToFix) {
    // fixing the img url
    return contentToFix.split('/uploads/').join(`${API_URL}/uploads/`);
  }

  // https://stackoverflow.com/questions/57447757/using-images-uploaded-on-strapi-on-nuxt-front-end

  //   data() {
  //     return {
  //         strapi_url: 'https://url-from-your-strapi.com'
  //     }
  // }, computed: {
  //     changed_post_content: function () {
  //         return post_content.split('/uploads/').join(`${this.strapi_url}/uploads/` );
  //     }
  // },
  return (
    // <MainContainer
    //   centered={true}
    //   backgroundColor={backgroundColor}
    //   fontColor={fontColor}
    // >
    <ReactMarkDown className="formMarkdown markdown">
      {data(content)}
    </ReactMarkDown>
  );
};

export default FormMarkdown;
