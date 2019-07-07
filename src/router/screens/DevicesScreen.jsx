import React from "react";
import { DeviceListContainer, addDevicePopupContainer } from "../../containers/SystemContainers";
import { SimpleLink } from "../../components/ui/Links/Links";
import { Button } from "../../components/ui/Buttons/Buttons";
import { PrivateRoute } from "../PrivateRoute";

export function DevicesScreen({store}) {
  return (
    <div>
      <h2>Список устройств</h2>
      <DeviceListContainer />
      <div>
        <Button>
          <SimpleLink to="/system/addDevice">Добавить устройство</SimpleLink>
        </Button>
      </div>
      <PrivateRoute path="/system/addDevice" component={addDevicePopupContainer} />
    </div>
  )
}