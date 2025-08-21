// ZURFY API Configuration
// Note: In production, these should be stored as environment variables or in a secure backend
const ZURFY_CONFIG = {
    // Printify APIs
    printify: {
        primary: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6Ijc2YzAyM2M3ZmNhMDFkMGZjYjI1MTY3ZmQ4ZjllZGU4ODc0ZGU1MzY5NDk4MmQ2ZTUxN2NmYTlmMDJmZmI4MDcxZWI5MGQ0Yzc3MDgxMmY5IiwiaWF0IjoxNzUzNzAwNDIwLjUzOTkyOCwibmJmIjoxNzUzNzAwNDIwLjUzOTkzMSwiZXhwIjoxNzg1MjM2NDIwLjUxODc0OSwic3ViIjoiMTA4MzcyNzEiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIiwidXNlci5pbmZvIl19.lZ3AeE6jbx52GyzrvshWdro5OuXZplnSVFk3QIviaCdZoUwTTCqZ79kpbVjrGiy_5T5RkFsHujL90XmGcj3Ae_lh8PtGn-PAF0VDLTkDCPSJs6NDOREoMKR2WPjxbIF5u8UgNlYgC1Nz2niPXrWG7psD9TL6sFAL-aQTgC_mTObBgTSWICkRrCnwS3pSAbU9KvG8O7kdHIOV8hCbATfcBiiolqMiXbkBgO-Ev_xHdLQsBgDpz0K1D4ZyIoGgb1UODqstTbLowGbG087sfYcjxUb_G8PJqozjMv6FRpBzO4EgD7c0-9VtY9OpXI185geDE10PGOgYuf9YPBAiArDSNZ_d35-zw7beZ7aI8GlOKAccO-C5RBZoQUQYA7DPWYESjb7lSvY5pm2FyOverbjfBAqoueDxXMFatzAbH-2zKZ44zMHAqXkSrj2pUZn6xV_2yPHvnYZ76D9204H7TUTP5S9C2E45Dznrg19clLm_7KeB9AeOdg6MUxnE4miIielbt_KDmV7bwL3hFVZBUvDRinoW0VkyH9JeYtdQwjGA5MsRudAqWuFk2NOOw7vFXhXqMoQ56sLAftCd93aQGAGgcJxpvEFnrqkqLduXdMSgpGRUO2t0BwPi-E934EhE8BspOsLIDyiPVLL32mhjHJbYJC0H-VJqwrfM4Y_A0HNwavA",
        secondary: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImQ5MWJjM2MzYmI4NGQxNWVhZjcyZjAyMzgzMmU1ZTljNDc1MzVhMzk5NWFkOTIyMTQyN2I4ODViNGVkMWY2NzE3NzczNzM5ZjliYjhhMDdhIiwiaWF0IjoxNzUzNzAwNDk4Ljk1NTM3NywibmJmIjoxNzUzNzAwNDk4Ljk1NTM3OCwiZXhwIjoxNzg1MjM2NDk4Ljk0ODU4OCwic3ViIjoiMTA4MzcyNzEiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIiwidXNlci5pbmZvIl19.LjSrDBq2cvKE4tgKdf8WxH-KGcjch2dcMY_XlYMuZvIlbDz4bN-diM5Ewxiud_hWxATrFhroVmQcbOXGW15cRtqVoW4rDOoMbmhV-yMXkwkC-Ga_gqHj-ZSg0WzhGGzL1JrLZxUn4Wf1kvD6SXqh0ocuiwpdcHrkuDgMOlphLN2HJJDpYn4s4wxHdrdeVXRRTgPuoGOSi4bUiVL2UoQvfVWM9ZP9I2O-b21wVXDgC6_UDQVkzpv_6BL6Kss-TAhr1TJMBEhWfN94Xqhe1mx6NNPI8b-PNMY3cZINsbr5U0-0J6GqZIb9qR4x1Tv_Qp7XBi8rH1Igf6H8bYYXKGj-2y9_P5yc7Ouoy-CcKkkN4SGTcw5Svo-K9ifmm9vp2LpPxQ-4CcI1FyTwycq7P7-ohX9wEKKFSLNatTAh0P4027Qjbt0WBv_dTH8WFuU2r104gBw0kR-AxHedVvF5JDgYgtMcd7wsTzpxVLprQsOoGt0fAMN3BfRHvAZx8E3iBm5-E6-fpebAt7-7L0uts65RAaxvT1UfS7qR9s1_x_I4OC_oV9yMePiKgNITVbR6k6VJxNmHh_N4xGo98S9wapiGpmrtbuoHMP9r7vFESO4ZoYWlEWEZN9GxV_APLhyRvK2CDzf14XJvaY15bOGV2XPogcUnLdiw8Y0nZCE11zOPFWo",
        baseUrl: "https://api.printify.com/v1"
    },

    // Etsy APIs
    etsy: {
        clientId: "23vcxwu1yreydz26cp3thfgu",
        clientSecret: "yuitb2utr9", // Note: This should be kept server-side only
        apiKey: "7gs1fkerp6kddfo5vbzsk71d",
        clientSecret2: "cotik3sxw5", // Backup secret
        baseUrl: "https://openapi.etsy.com/v3"
    },

    // Canva API
    canva: {
        apiKey: "AAGudD6F1Jc",
        baseUrl: "https://api.canva.com/v1"
    },

    // Shopify APIs
    shopify: {
        accessToken: "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",
        apiKey: "34984ea79ac4f6522d9bbf6cd6aef4b3",
        secretKey: "35ecdc6c3b281d16371238b2ff3c3346", // Should be server-side only
        // Note: You'll need to add your shop domain
        shopDomain: "your-shop-name.myshopify.com",
        baseUrl: "https://your-shop-name.myshopify.com/admin/api/2023-10"
    },

    // n8n Integration
    n8n: {
        // For n8n Cloud instance
        instanceUrl: process.env.N8N_URL || "https://zurfy.app.n8n.cloud",
        apiKey: process.env.N8N_API_KEY || "n8n_api_key_here",
        webhookUrl: process.env.N8N_WEBHOOK_URL || "https://zurfy.app.n8n.cloud/webhook",
        
        // n8n Docker configuration
        docker: {
            image: "n8nio/n8n:latest",
            port: 5678,
            dataPath: "./n8n-data"
        },
        
        // Pre-built workflow templates
        templates: {
            canvaToShopify: "workflow_1",
            printifySync: "workflow_2",
            etsyAutomation: "workflow_3",
            bulkProductCreation: "workflow_4"
        }
    }
};

// API Helper Functions
const ZurfyAPI = {
    // Printify API calls
    printify: {
        async getProducts() {
            try {
                const response = await fetch(`${ZURFY_CONFIG.printify.baseUrl}/shops.json`, {
                    headers: {
                        'Authorization': `Bearer ${ZURFY_CONFIG.printify.primary}`,
                        'Content-Type': 'application/json'
                    }
                });
                return await response.json();
            } catch (error) {
                console.error('Printify API Error:', error);
                return null;
            }
        },

        async createProduct(productData) {
            try {
                const response = await fetch(`${ZURFY_CONFIG.printify.baseUrl}/shops/{shop_id}/products.json`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${ZURFY_CONFIG.printify.primary}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productData)
                });
                return await response.json();
            } catch (error) {
                console.error('Printify Create Product Error:', error);
                return null;
            }
        }
    },

    // Etsy API calls (Note: Most Etsy API calls require OAuth)
    etsy: {
        async getShops() {
            try {
                const response = await fetch(`${ZURFY_CONFIG.etsy.baseUrl}/application/shops`, {
                    headers: {
                        'x-api-key': ZURFY_CONFIG.etsy.apiKey,
                        'Content-Type': 'application/json'
                    }
                });
                return await response.json();
            } catch (error) {
                console.error('Etsy API Error:', error);
                return null;
            }
        }
    },

    // Shopify API calls
    shopify: {
        async getProducts() {
            try {
                const response = await fetch(`${ZURFY_CONFIG.shopify.baseUrl}/products.json`, {
                    headers: {
                        'X-Shopify-Access-Token': ZURFY_CONFIG.shopify.accessToken,
                        'Content-Type': 'application/json'
                    }
                });
                return await response.json();
            } catch (error) {
                console.error('Shopify API Error:', error);
                return null;
            }
        },

        async createProduct(productData) {
            try {
                const response = await fetch(`${ZURFY_CONFIG.shopify.baseUrl}/products.json`, {
                    method: 'POST',
                    headers: {
                        'X-Shopify-Access-Token': ZURFY_CONFIG.shopify.accessToken,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ product: productData })
                });
                return await response.json();
            } catch (error) {
                console.error('Shopify Create Product Error:', error);
                return null;
            }
        }
    },

    // n8n API calls
    n8n: {
        async getWorkflows() {
            try {
                const response = await fetch(`${ZURFY_CONFIG.n8n.instanceUrl}/api/v1/workflows`, {
                    headers: {
                        'X-N8N-API-KEY': ZURFY_CONFIG.n8n.apiKey,
                        'Content-Type': 'application/json'
                    }
                });
                return await response.json();
            } catch (error) {
                console.error('n8n Get Workflows Error:', error);
                return null;
            }
        },

        async createWorkflow(workflowData) {
            try {
                const response = await fetch(`${ZURFY_CONFIG.n8n.instanceUrl}/api/v1/workflows`, {
                    method: 'POST',
                    headers: {
                        'X-N8N-API-KEY': ZURFY_CONFIG.n8n.apiKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(workflowData)
                });
                return await response.json();
            } catch (error) {
                console.error('n8n Create Workflow Error:', error);
                return null;
            }
        },

        async executeWorkflow(workflowId, data) {
            try {
                const response = await fetch(`${ZURFY_CONFIG.n8n.webhookUrl}/${workflowId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                return await response.json();
            } catch (error) {
                console.error('n8n Execute Workflow Error:', error);
                return null;
            }
        },

        async activateWorkflow(workflowId) {
            try {
                const response = await fetch(`${ZURFY_CONFIG.n8n.instanceUrl}/api/v1/workflows/${workflowId}/activate`, {
                    method: 'POST',
                    headers: {
                        'X-N8N-API-KEY': ZURFY_CONFIG.n8n.apiKey,
                        'Content-Type': 'application/json'
                    }
                });
                return await response.json();
            } catch (error) {
                console.error('n8n Activate Workflow Error:', error);
                return null;
            }
        }
    },

    // Test API connections
    async testConnections() {
        const results = {
            printify: false,
            shopify: false,
            etsy: false,
            canva: false,
            n8n: false
        };

        try {
            // Test Printify
            const printifyTest = await this.printify.getProducts();
            results.printify = printifyTest !== null;

            // Test Shopify
            const shopifyTest = await this.shopify.getProducts();
            results.shopify = shopifyTest !== null;

            // Test Etsy (basic endpoint)
            const etsyTest = await this.etsy.getShops();
            results.etsy = etsyTest !== null;

            // Canva test would require more complex setup
            results.canva = true; // Placeholder

            // Test n8n
            const n8nTest = await this.n8n.getWorkflows();
            results.n8n = n8nTest !== null;

        } catch (error) {
            console.error('API Connection Test Error:', error);
        }

        return results;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ZURFY_CONFIG, ZurfyAPI };
}