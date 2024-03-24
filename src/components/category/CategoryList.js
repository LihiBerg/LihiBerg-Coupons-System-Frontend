import { useState } from "react";
const CategoryList = ({ onSelect }) => {

    const categories = [
        { id: 0, name: 'Concerts' },
        { id: 1, name: 'Traveling' },
        { id: 2, name: 'Pet supplies' },
        { id: 3, name: 'Restaurants' },
        { id: 4, name: 'Sports' },
        { id: 5, name: 'Furniture' },
        { id: 6, name: 'Fashion' },
        { id: 7, name: 'Jewelry' },
        { id: 8, name: 'Electricity' },
        { id: 9, name: 'Food' },
        { id: 10, name: 'Health' },
        { id: 11, name: 'Cosmetics' },
        { id: 12, name: 'Camping' },
        { id: 13, name: 'Entertainment' },
        { id: 14, name: 'Other' }
    ]

    const [selectedCategoryId, setSelectedCategoryId] = useState(undefined);

    const handleCategoryChange = (event) => {
        const categoryId = parseInt(event.target.value, 10);
        if (categoryId != undefined) {
            setSelectedCategoryId(categoryId);
            onSelect(categoryId);
        }
        setSelectedCategoryId(14);
        onSelect(14);
    };

    return (
        <div className="category">
            <select value={selectedCategoryId} onChange={handleCategoryChange}>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryList;