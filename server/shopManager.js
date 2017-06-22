//The warehouse, i.e., the list of items stored in the shop
var warehouse = [
    {
		ID: 1,
        type: "trausers",
		size: "S",
        quantity: 2,
		colour: "blue",
        price: 11,
        season: 2017
	},
    {
		ID: 1,
        type: "trausers",
		size: "S",
        quantity: 2,
		colour: "grey",
        price: 15,
        season: 2017
	},
    {
		ID: 1,
        type: "trausers",
		size: "M",
        quantity: 3,
		colour: "blue",
        price: 17,
        season: 2017
	},
    {
		ID: 2,
        type: "trausers",
		size: "M",
        quantity: 4,
		colour: "grey",
        price: 10,
        season: 2016
	},
    {
		ID: 2,
        type: "trausers",
		size: "L",
        quantity: 1,
		colour: "grey",
        price: 4,
        season: 2016
	},
    {
		ID: 3,
        type: "sweatshirt",
		size: "S",
        quantity: 3,
		colour: "green",
        price: 22,
        season: 2016
	},
    {
		ID: 3,
        type: "sweatshirt",
		size: "S",
        quantity: 3,
		colour: "yellow",
        price: 100,
        season: 2016
	},
    {
		ID: 3,
        type: "sweatshirt",
		size: "M",
        quantity: 1,
		colour: "green",
        price: 110,
        season: 2016
	},
    
];


/** 
 * @brief getter of the list of user
 * @return the list of items
 */
var getWarehouse = function getWarehouse(){
    return warehouse;
}

/** 
 * @brief this function finds the eelments that mathes the input criteria, if an input(criteria) is null, it will be ignored
 * @param itemID the ID of the item, use to filter the set of items
 * @param itemSize the size of the item, use to filter the set of items
 * @param itemColour the colour of the item, use to filter the set of items
 * @return the list of items
 */
var searchItems = function searchItems(itemID,itemSize,itemColour)
{
    //copy by value the array
    var result = warehouse.slice();
    
    if(itemID!=null)
        result = searchItemID(result,itemID);
    
    if(itemSize!=null)
        result = searchItemSize(result,itemSize);
    
    if(itemColour!=null)
        result = searchItemColour(result,itemColour);

    if (result.length>0)
        return result;
    else
        return null;
        
        
}

/*
 * @brief This function search for an item, given his ID
 * @param items the set of items to filter with the given criteria
 * @param itemID the ID of the item, use to filter the set of items
 */
var searchItemID = function searchItemID(items,itemID)
{
    var result = [];
    
    for (i=0; i < items.length; i++)
	{
		if (items[i].ID == itemID)
		{
			result.push(items[i]);
		}
    }
    
    //returns the array with the elments that match the criteria
    return result;
    
}

/*
 * @brief This function search for an item, given his size
  * @param items the set of items to filter with the given criteria
 * @param itemSize the size of the item, use to filter the set of items
 */
var searchItemSize = function searchItemSize(items,itemSize)
{
    var result = [];
    
    for (i=0; i < items.length; i++)
	{
		if (items[i].size == itemSize)
		{
			result.push(items[i]);
		}
    }
    
    //returns the array with the elments that match the criteria
    return result;
    
}

/*
 * @brief This function search for an item, given his colour
 * @param items the set of items to filter with the given criteria
 * @param itemColour the colour of the item, use to filter the set of items
 */
var searchItemColour = function searchItemColour(items,itemColour)
{
    var result = [];
    
    for (i=0; i < items.length; i++)
	{
		if (items[i].colour == itemColour)
		{
			result.push(items[i]);
		}
    }
    
    //returns the array with the elments that match the criteria
    return result;
    
}

/*
 * @brief internal function that searches for an item and return the first one that matches 
 * @param the position in which the item is stored, null if the item is not found
 */
function searchItemPos(item)
{
    for (i=0; i < warehouse.length; i++)
	{
		if (warehouse[i].ID == item.ID &&
           warehouse[i].colour == item.colour &&
            warehouse[i].size == item.size 
           )
		{
			return i;
		}
    }
    
    return null;
}

/**
 * @brief This function sell an item, given the criteria to identify it
 * @param itemID id of the item
 * @param itemColour the colour of the item
 * @param itemSize the size of the item
 * @return the item sold, null if the item is not found
 */
var sellItem = function sellItem(itemID,itemColour,itemSize)
{
    //search for the element, take the first one if more than one match
    var position = searchItemPos({ID : itemID, colour : itemColour, size : itemSize});
	
    //if is not found return null
	if (position == null)
    	return null;
	else
	{
		if (warehouse[position].quantity>1)
        {
            //modify the stiorage quantity,and returns the item
            warehouse[position].quantity = warehouse[position].quantity-1;
            return warehouse[position];
        }
        else
            //remove the item and return it
            return warehouse.splice(position, 1)[0];
	}
}

/**
 * @brief This function update the wareuse adding the item reveiced in input, if the item is already present, it will increase its quantity
 * @param item to be added
 * @return treu if the warehouse is updated, false if the quantity is higher tha 10
 */
var restockItem = function restockItem(item)
{
    var position = searchItemPos(item);
    
	if (position==null)
	{
		warehouse.push(item);
        return true;
	}
	else
    {
        if (warehouse[position].quantity<10)
        {
            warehouse[position].quantity = warehouse[position].quantity + item.quantity;
            return true;
        }
        else
            return false;
    }
    
}

//ADD YOUR CODE BELOW THIS COMMENT, IF IT IS POSSIBLE

//export functions
exports.getWarehouse = getWarehouse; 
exports.searchItems = searchItems; 
exports.sellItem = sellItem; 
exports.restockItem = restockItem; 
exports.sales = sales; 