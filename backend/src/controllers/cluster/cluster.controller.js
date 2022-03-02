const express = require('express');
const createError = require('http-errors');

const clusterService = require('./cluster.service');


exports.findAll = (req, res, next) => {
    return clusterService.findAll()
        .then(cluster => {
            res.json(cluster);
        });
};

exports.findOne = (req, res, next) => {
    return clusterService.findOne(req.params.myId)
        .then(cluster => {
            if (!cluster) {
                return next(new createError.NotFound("Cluster is not found"));
            }
            res.json(cluster);
        });
};

exports.findOneStart = (req, res, next) => {
    return clusterService.findOne(req.params.myId)
        .then(cluster => {
            if (!cluster) {
                return next(new createError.NotFound("Cluster is not found"));
            }
            res.json(cluster[0].startPoints);
        });
};

exports.findOneCluster = (req, res, next) => {
    return clusterService.findOne(req.params.myId)
        .then(cluster => {
            if (!cluster) {
                return next(new createError.NotFound("Cluster is not found"));
            }
            res.json(cluster[0].clusters);
        });
};


exports.create = async (req, res, next) => {
    const { startPoints } = req.body;

    if (!startPoints) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }
    const myClusters = await clusterService.findAll();
    const sortedClusters = [...myClusters].sort((a, b) => a.myId > b.myId);
    const myId = sortedClusters[sortedClusters.length - 1].myId + 1;
    const newCluster = {
        myIid: myId,
        startPoints: startPoints,
        clusters: {}
    };

    return clusterService.create(newCluster)
        .then(cluster => {
            res.status(201);
            res.json(cluster);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.update = (req, res, next) => {
    //const myId = req.params.myId;
    const { myId, clusters } = req.body;

    if (!clusters) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const update = {
        myId: myId,
        clusters: clusters
    };
    return clusterService.update(myId, update)
        .then(cluster => {
            res.json(cluster);
        })
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return clusterService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};