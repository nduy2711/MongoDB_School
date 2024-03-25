const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
const dbName = 'Orders';
const collectionName = 'Order';

async function connectToMongoDB()
{
    try {
        await client.connect();
        console.log('Connect to MongoDB successfully !!!');
    } catch (err) {
        console.error('Error: ',err);
    } finally{
        if(client){
            await client.connect();
            console.log('MongoDB connection closed');
        }
    }
}

async function findOrder() {
    try {
        await client.connect();
        console.log('Connect to MongoDB successfully !!!')
        
        ordersCollection = client.db(dbName).collection(collectionName);
        
        //query all
        const Order = await ordersCollection.find().toArray();
        Order.forEach(order => {
            console.log('orderID:', order.orderID);
            console.log('name:', order.orderDate);
            console.log('quantity:', order.totalAmount);
            console.log('price:', order.orderStatus);
            console.log('brand:', order.paymentMethod);
            console.log('image:', order.image);
            console.log('----------------------------------');
        });
    } catch (err) {
        console.error('Error:', err);
    } finally {
        if (client) {
            await client.close();
            console.log('MongoDB connection closed');
        }
    }
}

async function deleteOrder(orderIDToDelete) {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully !!!');
        
        ordersCollection = client.db(dbName).collection(collectionName);
        
        const result = await ordersCollection.deleteOne({ orderID: orderIDToDelete });
        
        if (result.deletedCount === 1) {
            console.log('Order with ID', orderIDToDelete, 'deleted successfully');
        } else {
            console.log('Order with ID', orderIDToDelete, 'not found');
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        if (client) {
            await client.close();
            console.log('MongoDB connection closed');
        }
    }
}

async function updateOrder(orderIDToUpdate, updatedData) {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully !!!');
        
        ordersCollection = client.db(dbName).collection(collectionName);
        
        const result = await ordersCollection.updateOne(
            { orderID: orderIDToUpdate },
            { $set: updatedData }
        );
        
        if (result.modifiedCount === 1) {
            console.log('Order with ID', orderIDToUpdate, 'updated successfully');
        } else {
            console.log('Order with ID', orderIDToUpdate, 'not found');
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        if (client) {
            await client.close();
            console.log('MongoDB connection closed');
        }
    }
}


findOrder();

//gen đần