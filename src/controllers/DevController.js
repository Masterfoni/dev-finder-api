const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async find(request, response) {
        const { latitude, longitude, stack } = request.query;

        const devs = await Dev.find({
            stack: {
                $in: parseStringAsArray(stack),
            },
            location: {
                $near: {
                    $geometry: {
                      type: 'Point',
                      coordinates: [ longitude, latitude ],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs });
    },

    async retrieve(request, response) {
        const dev = await Dev.findById(request.params.id);

        return response.json(dev);
    },

    async store(request, response) {
        const { github_username, stack, latitude, longitude } = request.body;
    
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techArray = parseStringAsArray(stack);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                stack: techArray,
                location
            });
        }

    
        return response.json(dev);
    },

    async update(request, response) {
        const stockItem = await Dev.findByIdAndUpdate(request.params.id, request.body, { 
            new: true 
        });

        return response.json(stockItem);
    },

    async delete(request, response) {
        await Dev.findByIdAndRemove(request.params.id);

        return response.send();
    }
};