/*Packages*/
import React from 'react';
import { 
    Text, 
    StyleSheet,
    Platform 
} from "react-native";
import { 
    createAppContainer 
} from "react-navigation";
import { 
    createStackNavigator 
} from "react-navigation-stack";
import { 
    createMaterialBottomTabNavigator
} from "react-navigation-material-bottom-tabs";
import { 
    createBottomTabNavigator 
} from "react-navigation-tabs";
import {
    createDrawerNavigator
} from 'react-navigation-drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

/*Screens*/
import Categories from '../screens/categories';
import Home       from '../screens/home';
import Orders     from '../screens/orders';
import Profile    from '../screens/profile';
import AddItem    from '../screens/addItem';
import Drawer     from '../components/Drawer';

/*Constants*/
import {Colors} from '../services/constants';

/*Navigators*/

/*Stack Navigators*/
const defaultStackNavigationOptions = {
    headerStyle: {
        backgroundColor: Colors.colorBackgroundContent
    }
}

const categoriesStackNavigator = createStackNavigator(
    {
        Categories: Categories
    }, 
    {
        defaultNavigationOptions: defaultStackNavigationOptions
    }
);

const homeStackNavigator = createStackNavigator(
    {
        Home: Home
    },
    {
        defaultNavigationOptions:  defaultStackNavigationOptions
    }
)

const OrdersStackNavigator = createStackNavigator(
    {
        Orders: Orders
    },
    {
        defaultNavigationOptions:  defaultStackNavigationOptions
    }
)

const ProfileStackNavigator = createStackNavigator(
    {
        Profile: Profile
    },
    {
        defaultNavigationOptions:  defaultStackNavigationOptions
    }
)

const AddItemStackNavigator = createStackNavigator(
    {
        AddItem:AddItem
    },
    {
        defaultNavigationOptions:  defaultStackNavigationOptions
    }
)

/*Tab Navigator*/
const styles = StyleSheet.create({
    text: {
        fontFamily: 'Roboto-Bold'
    }
})

const tabScreenMenus = {
    Home: {
        screen: homeStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabBarInfo) => 
                <Ionicons 
                    name  = 'md-home'
                    size  = {20} 
                    color = {tabBarInfo.tintColor}
                />,
            tabBarLabel: 
                <Text style = {styles.text}>Home</Text>
        }
    },
    Categories: {
        screen: categoriesStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabBarInfo) => 
                <Ionicons 
                    name  = 'md-grid'
                    size  = {20} 
                    color = {tabBarInfo.tintColor}
                />,
            tabBarLabel: 
                <Text style = {styles.text}>Categories</Text>
        }
    },
    Orders: {
        screen: OrdersStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabBarInfo) => 
            <Ionicons 
                name  = 'md-list'
                size  = {20} 
                color = {tabBarInfo.tintColor}
            />,
            tabBarLabel: 
            <Text style = {styles.text}>Orders</Text>
        }
    },
    Profile:{
        screen: ProfileStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabBarInfo) => 
            <Ionicons 
                name  = 'md-person'
                size  = {20} 
                color = {tabBarInfo.tintColor}
            />,
            tabBarLabel: 
            <Text style = {styles.text}>Profile</Text>
        }
    }
}

const tabStylingAndroid = {
    barStyle: {
        backgroundColor: Colors.colorBackgroundContent
    },
    activeColor: Colors.colorPrimaryTheme,
    inactiveColor: Colors.colorHeadingText
}

const tabStylingIOS = {
    activTintColor: Colors.colorPrimaryTheme,
    activeBackgroundColor: Colors.colorBackgroundContent,
    inactiveTintColor: Colors.colorHeadingText,
    inactiveBackgroundColor: Colors.colorBackgroundContent,
    labelStyle: {
        fontSize: 18
    }
}

const TabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(
        tabScreenMenus,
        tabStylingAndroid
    )
    : createBottomTabNavigator(
        tabScreenMenus,
        {tabBarOptions: tabStylingIOS}      
    )


/*Drawer Navigator*/
const DrawerNavigator = createDrawerNavigator(
    {
        Shop: {
            screen: TabNavigator
        },
        Sell: {
            screen: AddItemStackNavigator
        },
        Profile: {
            screen: ProfileStackNavigator
        }
    },
    {
        width: 150,
        contentComponent: Drawer
    }   
)


export default createAppContainer(DrawerNavigator);

