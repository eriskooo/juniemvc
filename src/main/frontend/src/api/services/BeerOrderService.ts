/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BeerOrderDto } from '../models/BeerOrderDto';
import type { BeerOrderShipmentDto } from '../models/BeerOrderShipmentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BeerOrderService {
    /**
     * Get all beer orders
     * Returns a list of all beer orders in the system.
     * @returns BeerOrderDto Successfully retrieved the list of beer orders
     * @throws ApiError
     */
    public static getAllBeerOrders(): CancelablePromise<Array<BeerOrderDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/beer-orders',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Create a new beer order
     * Creates a new beer order in the system. The ID, version, createdDate, and updateDate fields will be ignored if provided.
     * @param requestBody Beer order object to be created
     * @returns BeerOrderDto Successfully created a new beer order
     * @throws ApiError
     */
    public static createBeerOrder(
        requestBody: BeerOrderDto,
    ): CancelablePromise<BeerOrderDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/beer-orders',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - validation error`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get a beer order by ID
     * Returns a beer order by its ID.
     * @param id ID of the beer order
     * @returns BeerOrderDto Successfully retrieved the beer order
     * @throws ApiError
     */
    public static getBeerOrderById(
        id: number,
    ): CancelablePromise<BeerOrderDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/beer-orders/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Beer order not found`,
            },
        });
    }
    /**
     * Update a beer order
     * Updates an existing beer order. The ID in the path must match the ID in the request body.
     * @param id ID of the beer order
     * @param requestBody Beer order object with updated information
     * @returns BeerOrderDto Successfully updated the beer order
     * @throws ApiError
     */
    public static updateBeerOrder(
        id: number,
        requestBody: BeerOrderDto,
    ): CancelablePromise<BeerOrderDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/beer-orders/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - validation error`,
                401: `Unauthorized`,
                404: `Beer order not found`,
            },
        });
    }
    /**
     * Delete a beer order
     * Deletes a beer order by its ID.
     * @param id ID of the beer order
     * @returns void
     * @throws ApiError
     */
    public static deleteBeerOrder(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/beer-orders/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Beer order not found`,
            },
        });
    }
    /**
     * Get all shipments for a beer order
     * Returns a list of all shipments for a specific beer order.
     * @param beerOrderId ID of the beer order to get shipments for
     * @returns BeerOrderShipmentDto Successfully retrieved the list of shipments
     * @throws ApiError
     */
    public static getAllShipments(
        beerOrderId: number,
    ): CancelablePromise<Array<BeerOrderShipmentDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/beer-orders/{beerOrderId}/shipments',
            path: {
                'beerOrderId': beerOrderId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Beer order not found`,
            },
        });
    }
    /**
     * Create a new shipment for a beer order
     * Creates a new shipment for a specific beer order. The ID, version, createdDate, and updateDate fields will be ignored if provided.
     * @param beerOrderId ID of the beer order to create a shipment for
     * @param requestBody Shipment object to be created
     * @returns BeerOrderShipmentDto Successfully created a new shipment
     * @throws ApiError
     */
    public static createShipment(
        beerOrderId: number,
        requestBody: BeerOrderShipmentDto,
    ): CancelablePromise<BeerOrderShipmentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/beer-orders/{beerOrderId}/shipments',
            path: {
                'beerOrderId': beerOrderId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - validation error`,
                401: `Unauthorized`,
                404: `Beer order not found`,
            },
        });
    }
    /**
     * Get a specific shipment for a beer order
     * Returns a specific shipment for a beer order.
     * @param beerOrderId ID of the beer order
     * @param shipmentId ID of the shipment to get
     * @returns BeerOrderShipmentDto Successfully retrieved the shipment
     * @throws ApiError
     */
    public static getShipmentById(
        beerOrderId: number,
        shipmentId: number,
    ): CancelablePromise<BeerOrderShipmentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/beer-orders/{beerOrderId}/shipments/{shipmentId}',
            path: {
                'beerOrderId': beerOrderId,
                'shipmentId': shipmentId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Beer order or shipment not found`,
            },
        });
    }
    /**
     * Update a specific shipment for a beer order
     * Updates a specific shipment for a beer order. The ID, version, createdDate, and updateDate fields will be ignored if provided.
     * @param beerOrderId ID of the beer order
     * @param shipmentId ID of the shipment to update
     * @param requestBody Shipment object to be updated
     * @returns BeerOrderShipmentDto Successfully updated the shipment
     * @throws ApiError
     */
    public static updateShipment(
        beerOrderId: number,
        shipmentId: number,
        requestBody: BeerOrderShipmentDto,
    ): CancelablePromise<BeerOrderShipmentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/beer-orders/{beerOrderId}/shipments/{shipmentId}',
            path: {
                'beerOrderId': beerOrderId,
                'shipmentId': shipmentId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - validation error`,
                401: `Unauthorized`,
                404: `Beer order or shipment not found`,
            },
        });
    }
    /**
     * Delete a specific shipment for a beer order
     * Deletes a specific shipment for a beer order.
     * @param beerOrderId ID of the beer order
     * @param shipmentId ID of the shipment to delete
     * @returns void
     * @throws ApiError
     */
    public static deleteShipment(
        beerOrderId: number,
        shipmentId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/beer-orders/{beerOrderId}/shipments/{shipmentId}',
            path: {
                'beerOrderId': beerOrderId,
                'shipmentId': shipmentId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Beer order or shipment not found`,
            },
        });
    }
}
