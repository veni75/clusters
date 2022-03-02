const Cluster = require('../../models/cluster.model');

exports.create = clusterData => {
    const cluster = new Cluster(clusterData);
    return cluster.save();
};

exports.findAll = () => Cluster.find();

exports.findOne = myId => Cluster.find({myId:myId});

exports.update = (myId, updateData) => Cluster.findOneAndUpdate(myId, updateData, {new: true});

exports.delete = id => Cluster.findByIdAndRemove(id); 