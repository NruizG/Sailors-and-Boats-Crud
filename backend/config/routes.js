/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  // Boats
  'POST /boats': 'BoatsController.create',
  'GET /boats': 'BoatsController.find',
  'PATCH /boats/:id': 'BoatsController.update',
  'DELETE /boats/:id': 'BoatsController.destroy',
  'GET /boats/:color': 'BoatsController.findByColor',
  // Reserves
  'POST /reserves': 'ReservesController.create',
  'GET /reserves': 'ReservesController.find',
  'PATCH /reserves/:id': 'ReservesController.update',
  'DELETE /reserves/:id': 'ReservesController.destroy',
  'GET /reserves/sailors-leased-all-boats': 'ReservesController.sailorWhoLeasedAllBoats',
  // Sailors
  'POST /sailors': 'SailorsController.create',
  'GET /sailors': 'SailorsController.find',
  'PATCH /sailors/:id': 'SailorsController.update',
  'DELETE /sailors/:id': 'SailorsController.destroy',
  'GET /sailors/rating/:p_rating': 'SailorsController.getRaitingGraterThan'
};
