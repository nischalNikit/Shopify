import React, { useEffect, useState } from 'react';
import { 
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    View,
    Text,
    StyleSheet
} from 'react-native';
import {
    useSelector
} from 'react-redux';
import {
    HeaderButtons,
    Item
} from 'react-navigation-header-buttons';

import {Colors} from '../services/constants';
import Logo from '../components/Logo';
import CartIcon from '../components/CartIcon';
import CustomHeaderButton from '../components/HeaderButton';
import CategoryOvals from '../components/CategoryOvals';
import catalogue from '../components/Catalogue';


const Home = (props) => {
    const [homeCatalogue, setHomeCatalogue] = useState([]);
    const [stickyIndices, setStickyIndices] = useState([]);

    const categories = useSelector(store => store.ShopReducer.categories);
    const products = useSelector(store => store.ShopReducer.products);

    const seeCategory = (category) => {
        props.navigation.navigate('Category', {
            categoryId: category.id,
            categoryName: category.title
        })
    }

    useEffect(() => {
        if(categories.length > 0){
            let fetchedHomeCatalogue = [];
            categories.forEach(category => {
                fetchedHomeCatalogue.push(category);
                let selectedProducts = products.filter(product => product.categoryId === category.id);
                fetchedHomeCatalogue = fetchedHomeCatalogue.concat(selectedProducts);
            });
            setHomeCatalogue(fetchedHomeCatalogue);
        }
    }, [categories, products]);

    useEffect(() => {
        if(homeCatalogue.length > 0){
            let updatedStickyIndices = [];
            homeCatalogue.forEach((catalogueItem, index) => {
                if(!catalogueItem.categoryId)
                    updatedStickyIndices.push(index);
            });
            setStickyIndices(updatedStickyIndices);
        }
    }, [homeCatalogue])

    return(
        <SafeAreaView style = {{flex: 1}}>
            <View style = {styles.Container}>
                <View 
                    style = {{flex: 1, width: '100%'}}
                >
                    {   homeCatalogue.length === 0 &&
                        <View style = {styles.Spinner}>
                            <ActivityIndicator 
                                size="small" 
                                color= {Colors.colorWhite}
                                animating = {true}
                            />
                        </View>
                    }
                    {   homeCatalogue.length > 0 &&
                        <View 
                            style = {styles.TopCategoriesContainer}
                        >
                            <View
                                style = {styles.TopCategory}
                            >
                                <Text 
                                    style = {styles.categoryText}
                                >
                                    Top Categories
                                </Text>
                            </View>
                            <ScrollView 
                                horizontal = {true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <CategoryOvals 
                                    categories = {categories}
                                    onClick = {seeCategory}
                                />
                            </ScrollView>
                        </View>
                    }
                    <ScrollView
                        style = {styles.CategoryList}
                        showsVerticalScrollIndicator = {false}
                        stickyHeaderIndices = {stickyIndices}
                    >
                        {catalogue(props, homeCatalogue)}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

Home.navigationOptions = (navData) => {
    return {
        headerTitleStyle: {
            alignSelf: 'center'
        },
        headerTitle: () => <Logo />,
        headerLeft: () => (
            <HeaderButtons
                HeaderButtonComponent = {CustomHeaderButton}
            >
                <Item 
                    iconName = "ios-menu"
                    title    = "DRAWER"
                    onPress  = {
                       () => navData.navigation.toggleDrawer()
                    }    
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <CartIcon 
                onPress = { 
                    () => navData.navigation.navigate('Checkout')
                }
            />
        )
    } 
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.colorWhite
    },
    TopCategoriesContainer: {
        height: 160
    },
    TopCategory: {
        padding: 5,
        marginHorizontal: 5
    },
    CategoryList: {
        width: '100%',
        paddingHorizontal: 5,
        marginTop: 10
    },
    categoryText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        color: Colors.colorPrimaryTheme
    },
    Spinner: {
        alignSelf: 'center',
        backgroundColor: Colors.colorPrimaryTheme,
        marginTop: 20,
        width: 75,
        padding: 5,
        borderRadius: 100
    }
});

export default Home;
