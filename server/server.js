const fs = require('fs');
const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');

const ProdDB = [
    {
        id: 1,
        name: 'Blue Shirt',
        category: 'Shirts' ,
        price: 30 ,
        imageURL: 'https://www.shutterstock.com/image-photo/happy-handsome-man-wear-blue-shirt-743634955',
    },

    {
        id: 2,
        name: 'Blue Denim',
        category: 'Jeans' ,
        price: 50 ,
        imageURL: 'https://www.shutterstock.com/image-photo/blue-jeans-isolated-on-white-96398333',
    },
    {
        id: 3,
        name: 'Leather Brown Belt',
        category: 'Accessories' ,
        price: 50 ,
        imageURL: 'https://www.shutterstock.com/image-photo/fastened-fashionable-mens-brown-leather-belt-1038772180',
    },


];
const resolvers = {
    Query: {
        productlist,
    },
    Mutation: {
        addprod,
    },

};

function productlist()
{
    return ProdDB;
}

function addprod( _, { product })
{
 product.id = ProdDB.length + 1;
 ProdDB.push(product);
 return product;
}
const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
});
app.use(express.static('public'));
server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
 console.log('App started on port 3000');
});