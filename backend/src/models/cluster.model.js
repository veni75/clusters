const mongoose = require('mongoose');

const ClusterSchema = mongoose.Schema({
    _id: String,    
    myId: Number,
    startPoints: {
        type: Array,
        required: true
    },
    clusters: {
        type: Object,
        required: true
    },    
}, {
    timeStamps: true
});

module.exports = mongoose.model('Cluster', ClusterSchema);