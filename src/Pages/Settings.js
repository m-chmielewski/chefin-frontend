import React from "react";

import PageContent from "../CommonElements/PageContent";
import Card from "../CommonElements/Card";
import Button from "../CommonElements/Button";

const Settings = ({ regularVisionCallback, regularVisionOn }) => {
 return (
  <PageContent regularVisionOn={regularVisionOn}>
   <h1>Settings</h1>
   <Card>
    <span>Low vision mode</span>
    <Button
     variant={`${regularVisionOn ? "positive" : "negative"}`}
     onClick={() => regularVisionCallback()}
    >
     Turn {regularVisionOn ? "on" : "off"}
    </Button>
   </Card>
  </PageContent>
 );
};

export default Settings;
