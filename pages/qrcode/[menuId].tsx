import React from "react";
import Box from "@material-ui/core/Box";

var QRCode = require("qrcode.react");

function Index(props: any) {
  return (
    <div className="container">
      <Box display="flex" width="100%" height="100%">
        <Box m="auto">
          <QRCode value={"http://localhost:3000/menu/" + props.menuId} />
        </Box>
      </Box>

      <style jsx>{`
        .container {
          position: relative;
          height: 100vh;
          width: 100vw;
        }
      `}</style>
    </div>
  );
}

Index.getInitialProps = async ({ query }: { query: any }) => {
  return { menuId: query?.menuId };
};

export default Index;
