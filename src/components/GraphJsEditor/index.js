import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";

const Editor = () => {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const gEditor = grapesjs.init({
      container: "#gjs",
      plugins: [gjsPresetWebpage],
      pluginsOpts: {
        gjsPresetWebpage: {},
      },
    });
    setEditor(gEditor);
  }, []);

  return <div id="gjs"></div>;
};

export default Editor;
