import { connect } from 'react-redux'
// import C from '../store/constants'
// import { WsCloudConnector } from '../services/WsCloudConnector';
import { SystemScreen } from '../router/screens/SystemScreen';

export const SystemScreenContainer = connect(
  state => ({
    isConnected: state.system.systemInfo.isConnected,
  }),
  dispatch => ({})
)(SystemScreen)

// export const WsCloudConnectorContainer = connect( 
//   state => ({
//     isConnected: state.system.systemInfo.isConnected,
//   }),
//   dispatch => null
// )(WsCloudConnector)
