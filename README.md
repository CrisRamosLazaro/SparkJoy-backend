[frontend repo](https://github.com/CrisRamosLazaro/SparkJoy)

## Listings Object Structure

The `listings` object has the following structure:

```json
{
    "id": number,
  "title": string,
  "images": [
      {
          "fileName": string
    }
  ],
  "price": number,
  "categoryId": number,
  "userId": number,
  "location": {
      "latitude": number,
    "longitude": number
  }
}
```

## Messages Object Structure
      
The `messages` object has the following structure:
      
```json
{
  "fromUserId": number,
  "toUserId": number,
  "listingId": number,
  "content": string,
  "id": number,
  "dateTime": number
}
```