import Axios from 'axios'

var Pyramid = (function () {
    'use strict'

    /**
     * Configuration options for Pyramid.
     * @class config
     *  @property {string} pyramidsite - Your Pyramid 2018 site.
     */

    /**
     * Creates a new Pyramid object.
     * @constructor
     * @param {config}  config               Configuration options for Pyramid
     */
    Pyramid = function (config) {
        this.config = this._cloneConfig(config)
    }

    Pyramid.prototype.SetToken = function (token) {
        this.token = token
    }

    Pyramid.prototype.GetReport = function (reportId) {
        const data = {
            query: {
                service: 'LocalizationService',
                method: 'getLocalizationResource',
                arguments: ['en-US'],
                callPosition: '1',
            },
            type: 3,
            rId: reportId,
            benchmarkNeeded: false,
        }

        const headers = {
            pyramidembeddedauth: this.token,
        }

        return Axios.post(`${this.config.pyramidsite}/infraEntryPoint`, data, {
            headers,
        })
    }

    /**
     * Returns a cloned copy of the passed object.
     * @ignore
     */
    Pyramid.prototype._cloneConfig = function (obj) {
        if (null === obj || 'object' !== typeof obj) {
            return obj
        }

        const copy = {}
        for (const attr in obj) {
            // TODO: Why is hasOwnProperty used here???
            if ({}.hasOwnProperty.call(obj, attr)) {
                copy[attr] = obj[attr]
            }
        }

        return copy
    }

    /**
     * Returns a reference of Pyramid as a result of a require call.
     * @ignore
     */
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Pyramid
        module.exports.inject = function (conf) {
            return new Pyramid(conf)
        }
    }

    return Pyramid
})()

export { Pyramid }
