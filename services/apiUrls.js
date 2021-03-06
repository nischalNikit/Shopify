import { FIREBASE_KEY } from '@env';

const apiUrl = {
    signUp: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + FIREBASE_KEY,
    signIn: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + FIREBASE_KEY,
    orders: 'https://shopify-native-database-default-rtdb.firebaseio.com/orders.json?auth=',
    categories: 'https://shopify-native-database-default-rtdb.firebaseio.com/Categories.json',
    products: 'https://shopify-native-database-default-rtdb.firebaseio.com/Products.json'
}

export default apiUrl;