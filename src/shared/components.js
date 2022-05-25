import Landing from '../components/Editor/EditorComponents/Landing';
import Paragraph from '../components/Editor/EditorComponents/Paragraph'
import Subheader from "../components/Editor/EditorComponents/Subheader";
import PhotoSwitcher from '../components/Editor/EditorComponents/PhotoSwitcher';
import Image from '../components/Editor/EditorComponents/Image';
import React from "react";

export const attribute_types = {
  STRING: "string",
  PIXEL_VALUE: "pixel_value",
  ARRAY: "array",
  OBJECT: "object",
  IMAGE_LINK : "image_url"
};

export const components = {
    landing_page: {
        id : "landing_page",
        label: "Landing Page",
        component: function (content, selected, key, setIndexFromChild) {
            return (
                <Landing
                    key={key}
                    index={key}
                    content={content}
                    selected={selected}
                    setIndexFromChild={setIndexFromChild}
                />
            );
        },
        attributes: [
            {
                id: "image_link",
                label: "Image link",
                type: attribute_types.IMAGE_LINK,
            },
            {
                id: "image_credits",
                label: "Image credits",
                type: attribute_types.STRING,
            },
            {
                id: "credits_font_family",
                label: "Image credits font family",
                type: attribute_types.STRING,
            },
            {
                id: "credits_font_size",
                label: "Image credits font size",
                type: attribute_types.PIXEL_VALUE,
            },
            {
                id: "credits_font_color",
                label: "Image credits font color",
                type: attribute_types.STRING,
            },
        ],
    },
    paragraph : {
        id: "paragraph",
        label: "Paragraph",        
        component : function(content, selected, key, setIndexFromChild) {
            return (
                <Paragraph 
                    key={key} 
                    index={key} 
                    content={content} 
                    selected={selected} 
                    setIndexFromChild={setIndexFromChild}
                />)
        },
        attributes : [
            {
                id : "font_family",
                label : "Paragraph font family",
                type : attribute_types.STRING,
            },
            {
                id : "font_size",
                label : "Paragraph font size",
                type : attribute_types.PIXEL_VALUE,
            },
            {
                id : "font_color",
                label : "Paragraph font color",
                type : attribute_types.STRING,
            },
            {
                id : "line_spacing",
                label : "Paragraph line spacing",
                type : attribute_types.PIXEL_VALUE
            },
            {
                id : "paragraph_content",
                label : "Paragraph content",
                type : attribute_types.STRING
            },
            {
                id : "margin",
                label: "Paragraph margin",
                type : attribute_types.PIXEL_VALUE
            }
        ]
    },
    subheader: {
        id: "subheader",
        label: "Subheader",
        component: function (content, selected, key, setIndexFromChild) {
        return (
            <Subheader
                key={key}
                index={key}
                content={content}
                selected={selected}
                setIndexFromChild={setIndexFromChild}
            />
            )
        },
        attributes: [
            {
                id: "font_family",
                label: "Subheader font family",
                type: attribute_types.STRING,
            },
            {
                id: "font_size",
                label: "Subheader font size",
                type: attribute_types.PIXEL_VALUE,
            },
            {
                id: "font_color",
                label: "Subheader font color",
                type: attribute_types.STRING,
            },
            {
                id: "line_spacing",
                label: "Subheader line spacing",
                type: attribute_types.PIXEL_VALUE,
            },
            {
                id: "content",
                label: "Subheader content",
                type: attribute_types.STRING,
            },
            {
                id: "side_margin",
                label: "Subheader side margin",
                type: attribute_types.PIXEL_VALUE,
            },
        ],
    },
    image : {
        id: "image",
        label : "Image",
        component : function(content, selected, key, setIndexFromChild) {
            return (
                <Image 
                    key = {key} 
                    index = {key} 
                    content = {content} 
                    selected = {selected} 
                    setIndexFromChild={setIndexFromChild}/>
            )
        },
        attributes : [
            {
                id : "image_link",
                label : "Image link",
                type : attribute_types.IMAGE_LINK
            },
            {
                id : "image_credits",
                label : "Image credits",
                type : attribute_types.STRING
            },
            {
                id : "credits_font_color",
                label : "Image credits font color",
                type : attribute_types.STRING
            },
            {
                id : "font_family",
                label : "Font family",
                type : attribute_types.STRING
            },
            {
                id : "image_caption",
                label : "Image caption",
                type : attribute_types.STRING
            },
            {
                id : "caption_font_color",
                label : "Image caption font color",
                type : attribute_types.STRING
            },
            {
                id : "side_margin",
                label : "Side margin",
                type : attribute_types.PIXEL_VALUE
            }
        ]
    },
    photo_switcher : {
        id : "photo_switcher",
        label: "Photo Switcher with Text",        
        component : function(content, selected, key, setIndexFromChild) {
            return <PhotoSwitcher key={key} index={key} content={content} selected={selected} setIndexFromChild={setIndexFromChild}/>
        },
        attributes : [
            {
                id : "font_family",
                label : "Photo switcher font family",
                type : attribute_types.STRING
            },
            {
                id : "font_size",
                label : "Photo switcher font size",
                type : attribute_types.PIXEL_VALUE
            },
            {
                id : "font_color",
                label : "Photo switcher font color",
                type : attribute_types.STRING
            },
            {
                id : "photo_background_color",
                label : "Image background color",
                type : attribute_types.STRING
            },
            {
                id : "text_background_color",
                label : "Text background color",
                type : attribute_types.STRING
            },
            {
                id : "images",
                label: "Photo switcher images",
                type : attribute_types.ARRAY,
                childrens : [
                    {
                        id : "image_link",
                        label : "Image link",
                        type : attribute_types.IMAGE_LINK,
                    },
                    {
                        id : "image_text",
                        label : "Image text",
                        type : attribute_types.STRING
                    },
                    {
                        id : "image_header",
                        label : "Image header",
                        type : attribute_types.STRING
                    }
                ]
            }
        ]
    }
}

// Handles setting then initial values for the content
// of components.
export const setContentInitialValues = (attributes) => {
    let content = {};
    attributes.map((attribute) => {
        if (attribute.type === "string") {
            content[attribute.id] = "replace placeholder with your content";
        } else if (attribute.type === "array") {
            content[attribute.id] = [setContentInitialValues(attribute.childrens)]
        } else if (attribute.type === "pixel_value") {
            content[attribute.id] = "12px";
        } else if (attribute.type === "object") {
            content[attribute.id] = {};
        } else if (attribute.type === "image_url") {
            content[attribute.id] = "https://via.placeholder.com/940?text=Placeholder+Landing+Page+Image"
        }
    })
    return content;
}
