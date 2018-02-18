import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, ActivityIndicator, ListView, TouchableOpacity, AsyncStorage } from 'react-native'


import HomeView from './components/HomeView'
import ListViewApp from './components/ListViewApp'

const RootNavigator = StackNavigator(
  {
    Home: {
      screen: HomeView,
      navigationOptions: {
        headerTitle: 'Home',
      }
    },
    ListViewApp: {
      screen: ListViewApp,
      navigationOptions: {
        headerTitle: 'ListViewApp',
      }
    },
  },
  {
    initialRouteName: 'Home',
  }
);

// let storageSourceList
// AsyncStorage.getItem('@dataSourceList', (err, res) => {
//   //If user have some data in @dataSourceList, then ...
//   if (res !== null) {
//     storageSourceList = res
//     console.warn(res)
//   }
// });

export default class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        dataSourceList: new ListView.DataSource({
          rowHasChanged: (r1, r2) => {
            r1 !== r2
          }
        }),
        load: true
      }
  }

  // componentDidMount() {
  //   AsyncStorage.getItem('@dataSourceList', (err, res) => {
  //     if(err) console.error('some error in componentDidMount App',err)
  //     if(res !== null) console.warn("h")//this.updateDataSource(JSON.stringify(res))
  //   })
  // }

  updateDataSource = (data) => {
    //set data to AsyncStorage
    // let jsonData = JSON.stringify(data)
    // AsyncStorage.setItem('@dataSourceList',jsonData);

    this.setState({
      dataSourceList: this.state.dataSourceList.cloneWithRows(data),
      load: false
    })
  }

  execLoad = () => this.setState({ load: true })

  render() {
    return <RootNavigator screenProps={{ dataSourceList: this.state.dataSourceList, load: this.state.load, execLoad: this.execLoad, updateDataSource: this.updateDataSource }} />
  }
}

