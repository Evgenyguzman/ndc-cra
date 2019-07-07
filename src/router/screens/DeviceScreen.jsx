import React from "react";
import { DeviceContainer, addItemPopupContainer } from "../../containers/SystemContainers";
import { SimpleLink } from "../../components/ui/Links/Links";
import { Button } from "../../components/ui/Buttons/Buttons";
import { PrivateRoute } from "../PrivateRoute";

export function DeviceScreen(props) {
  return (
    <div>
      <DeviceContainer id={props.match.params.id} />
      <div>
        <Button>
          <SimpleLink to={ props.match.url + "/addItem"} >Добавить тэг</SimpleLink>
        </Button>
      </div>
      <PrivateRoute path={ props.match.url + "/addItem"} deviceId={props.match.params.id} component={addItemPopupContainer} />
    </div>
  )
}