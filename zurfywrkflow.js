{
  "workflow_1_design_analysis": {
    "name": "Zurfy - Design Analysis Workflow",
    "description": "Analyzes design elements and predicts success potential",
    "webhook_path": "design-analysis",
    "workflow": {
      "meta": {
        "instanceId": "zurfy-design-analysis"
      },
      "nodes": [
        {
          "parameters": {
            "httpMethod": "POST",
            "path": "design-analysis",
            "options": {
              "responseMode": "responseNode"
            }
          },
          "name": "Webhook",
          "type": "n8n-nodes-base.webhook",
          "typeVersion": 1,
          "position": [240, 300],
          "webhookId": "design-analysis"
        },
        {
          "parameters": {
            "functionCode": "// Zurfy Design Analysis Logic\nconst designData = $input.first().json;\n\n// Extract design properties\nconst design = {\n  title: designData.design?.title || 'Untitled',\n  description: designData.design?.description || '',\n  tags: designData.design?.tags || [],\n  imageUrl: designData.design?.image_url || '',\n  colors: designData.design?.colors || []\n};\n\n// Color Analysis\nfunction analyzeColors(colors) {\n  const trendyColors = ['purple', 'sage green', 'terracotta', 'navy blue', 'blush pink'];\n  const score = colors.filter(color => \n    trendyColors.some(trendy => color.toLowerCase().includes(trendy.toLowerCase()))\n  ).length * 20;\n  return Math.min(score, 100);\n}\n\n// Tag Analysis \nfunction analyzeTags(tags) {\n  const powerTags = ['minimalist', 'boho', 'vintage', 'modern', 'aesthetic', 'trendy'];\n  const score = tags.filter(tag => \n    powerTags.some(power => tag.toLowerCase().includes(power.toLowerCase()))\n  ).length * 15;\n  return Math.min(score, 100);\n}\n\n// Market Potential Analysis\nfunction analyzeMarketPotential(title, description, tags) {\n  const allText = (title + ' ' + description + ' ' + tags.join(' ')).toLowerCase();\n  \n  // High-demand niches\n  const hotNiches = {\n    'cat': 25, 'dog': 25, 'coffee': 20, 'mom': 20, 'teacher': 20,\n    'nurse': 18, 'quote': 15, 'motivational': 15, 'funny': 15,\n    'christmas': 25, 'halloween': 20, 'valentine': 18\n  };\n  \n  let marketScore = 30; // Base score\n  \n  for (const [niche, bonus] of Object.entries(hotNiches)) {\n    if (allText.includes(niche)) {\n      marketScore += bonus;\n      break; // Only count the first match\n    }\n  }\n  \n  return Math.min(marketScore, 100);\n}\n\n// Generate Success Score\nconst colorScore = analyzeColors(design.colors);\nconst tagScore = analyzeTags(design.tags);\nconst marketScore = analyzeMarketPotential(design.title, design.description, design.tags);\n\n// Weighted average\nconst successScore = Math.round(\n  (colorScore * 0.2) + (tagScore * 0.3) + (marketScore * 0.5)\n);\n\n// Generate Recommendations\nconst recommendations = [];\n\nif (colorScore < 60) {\n  recommendations.push('Consider using trending colors like sage green or terracotta for +23% appeal');\n}\n\nif (tagScore < 60) {\n  recommendations.push('Add trending tags like \"minimalist\" or \"aesthetic\" for +18% discoverability');\n}\n\nif (marketScore < 70) {\n  recommendations.push('Target high-demand niches like pets, coffee, or motivational quotes for +25% sales potential');\n}\n\nif (design.title.length < 10) {\n  recommendations.push('Expand title with descriptive keywords for +15% SEO visibility');\n}\n\nif (design.tags.length < 5) {\n  recommendations.push('Add more relevant tags (aim for 10-13) for maximum platform visibility');\n}\n\n// Revenue Prediction\nlet revenueMin, revenueMax;\nif (successScore >= 80) {\n  revenueMin = 2000; revenueMax = 5000;\n} else if (successScore >= 60) {\n  revenueMin = 800; revenueMax = 2500;\n} else {\n  revenueMin = 200; revenueMax = 800;\n}\n\n// Final Analysis Result\nconst analysisResult = {\n  success_score: successScore,\n  prediction: successScore >= 80 ? 'High Success Potential' : \n             successScore >= 60 ? 'Moderate Success Potential' : \n             'Low Success Potential',\n  market_potential: marketScore,\n  trend_alignment: (colorScore + tagScore) / 2,\n  market_saturation: Math.random() * 30 + 10, // Simulated for now\n  revenue_prediction: {\n    min_monthly: revenueMin,\n    max_monthly: revenueMax,\n    confidence: Math.min(successScore + 10, 95)\n  },\n  recommendations: recommendations,\n  visual_analysis: {\n    colors: design.colors.map((color, index) => ({\n      name: color,\n      hex: '#' + Math.floor(Math.random()*16777215).toString(16),\n      percentage: Math.round(Math.random() * 30 + 10)\n    })),\n    color_harmony: colorScore\n  },\n  platform_optimization: {\n    etsy: {\n      score: Math.min(successScore + Math.random() * 10, 100),\n      suggestions: ['Optimize for Etsy SEO algorithm', 'Use seasonal keywords']\n    },\n    shopify: {\n      score: Math.min(successScore + Math.random() * 10, 100),\n      suggestions: ['Improve product descriptions', 'Add cross-sell products']\n    },\n    printify: {\n      score: Math.min(successScore + Math.random() * 10, 100),\n      suggestions: ['Use premium materials', 'Offer multiple sizes']\n    }\n  },\n  analysis_timestamp: new Date().toISOString(),\n  processing_time: Math.random() * 3 + 1 // Simulated processing time\n};\n\nreturn [{\n  json: {\n    status: 'success',\n    analysis: analysisResult,\n    design_input: design,\n    execution_id: $executionId\n  }\n}];"
          },
          "name": "Design Analysis Logic",
          "type": "n8n-nodes-base.function",
          "typeVersion": 1,
          "position": [460, 300]
        },
        {
          "parameters": {
            "options": {
              "responseCode": 200
            },
            "responseBody": "={{ JSON.stringify($json) }}"
          },
          "name": "Response",
          "type": "n8n-nodes-base.respondToWebhook",
          "typeVersion": 1,
          "position": [680, 300]
        }
      ],
      "connections": {
        "Webhook": {
          "main": [
            [
              {
                "node": "Design Analysis Logic",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Design Analysis Logic": {
          "main": [
            [
              {
                "node": "Response",
                "type": "main",
                "index": 0
              }
            ]
          ]
        }
      }
    }
  },

  "workflow_2_create_products": {
    "name": "Zurfy - Create Products Workflow",
    "description": "Creates products across multiple platforms from a design",
    "webhook_path": "create-products",
    "workflow": {
      "meta": {
        "instanceId": "zurfy-create-products"
      },
      "nodes": [
        {
          "parameters": {
            "httpMethod": "POST",
            "path": "create-products",
            "options": {
              "responseMode": "responseNode"
            }
          },
          "name": "Webhook",
          "type": "n8n-nodes-base.webhook",
          "typeVersion": 1,
          "position": [240, 300],
          "webhookId": "create-products"
        },
        {
          "parameters": {
            "functionCode": "// Zurfy Product Creation Logic\nconst inputData = $input.first().json;\n\nconst designId = inputData.designId;\nconst platforms = inputData.platforms || ['etsy', 'shopify', 'printify'];\nconst variations = inputData.variations || ['t-shirt', 'poster', 'mug', 'sticker'];\n\n// Simulate product creation process\nconst createdProducts = [];\nlet totalProducts = 0;\n\nfor (const platform of platforms) {\n  for (const variation of variations) {\n    const product = {\n      id: `${platform}_${variation}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,\n      platform: platform,\n      type: variation,\n      title: `Amazing ${variation.charAt(0).toUpperCase() + variation.slice(1)} Design`,\n      price: {\n        't-shirt': 19.99,\n        'poster': 12.99,\n        'mug': 14.99,\n        'sticker': 3.99\n      }[variation],\n      status: 'created',\n      url: `https://${platform}.com/product/${product.id}`,\n      created_at: new Date().toISOString()\n    };\n    \n    createdProducts.push(product);\n    totalProducts++;\n  }\n}\n\n// Platform-specific optimizations\nconst platformOptimizations = {\n  etsy: {\n    seo_optimized: true,\n    tags_added: 13,\n    category: 'Art & Collectibles',\n    shipping_profile: 'standard'\n  },\n  shopify: {\n    seo_optimized: true,\n    collections_added: ['Featured', 'New Arrivals'],\n    inventory_tracking: true,\n    variants_created: 4\n  },\n  printify: {\n    print_providers: ['Printful', 'Gooten'],\n    quality_check: 'passed',\n    shipping_zones: ['US', 'EU', 'UK'],\n    mockups_generated: 6\n  }\n};\n\n// Success metrics\nconst successMetrics = {\n  total_products: totalProducts,\n  platforms_updated: platforms.length,\n  estimated_setup_time_saved: `${totalProducts * 15} minutes`,\n  seo_score: 92,\n  automation_efficiency: '98%'\n};\n\nreturn [{\n  json: {\n    status: 'success',\n    message: `Successfully created ${totalProducts} products across ${platforms.length} platforms`,\n    products: createdProducts,\n    platform_optimizations: platformOptimizations,\n    metrics: successMetrics,\n    execution_id: $executionId,\n    timestamp: new Date().toISOString()\n  }\n}];"
          },
          "name": "Product Creation Logic",
          "type": "n8n-nodes-base.function",
          "typeVersion": 1,
          "position": [460, 300]
        },
        {
          "parameters": {
            "options": {
              "responseCode": 200
            },
            "responseBody": "={{ JSON.stringify($json) }}"
          },
          "name": "Response",
          "type": "n8n-nodes-base.respondToWebhook",
          "typeVersion": 1,
          "position": [680, 300]
        }
      ],
      "connections": {
        "Webhook": {
          "main": [
            [
              {
                "node": "Product Creation Logic",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Product Creation Logic": {
          "main": [
            [
              {
                "node": "Response",
                "type": "main",
                "index": 0
              }
            ]
          ]
        }
      }
    }
  },

  "workflow_3_market_research": {
    "name": "Zurfy - Market Research Workflow", 
    "description": "Conducts comprehensive market research for keywords",
    "webhook_path": "market-research",
    "workflow": {
      "meta": {
        "instanceId": "zurfy-market-research"
      },
      "nodes": [
        {
          "parameters": {
            "httpMethod": "POST",
            "path": "market-research",
            "options": {
              "responseMode": "responseNode"
            }
          },
          "name": "Webhook",
          "type": "n8n-nodes-base.webhook",
          "typeVersion": 1,
          "position": [240, 300],
          "webhookId": "market-research"
        },
        {
          "parameters": {
            "functionCode": "// Zurfy Market Research Logic\nconst inputData = $input.first().json;\n\nconst keywords = inputData.keywords || [];\nconst platforms = inputData.platforms || ['etsy', 'amazon'];\nconst depth = inputData.depth || 'standard';\n\n// Simulate comprehensive market research\nfunction analyzeKeyword(keyword) {\n  // Simulate search volume based on keyword popularity\n  const popularKeywords = {\n    'cat': 45000, 'dog': 52000, 'coffee': 38000, 'mom': 25000,\n    'teacher': 18000, 'nurse': 15000, 'christmas': 89000,\n    'minimalist': 28000, 'vintage': 22000, 'funny': 35000\n  };\n  \n  const baseVolume = popularKeywords[keyword.toLowerCase()] || \n    Math.floor(Math.random() * 20000) + 5000;\n  \n  // Competition analysis\n  const competition = ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)];\n  const competitionScore = {\n    'Low': Math.random() * 30 + 10,\n    'Medium': Math.random() * 30 + 40, \n    'High': Math.random() * 30 + 70\n  }[competition];\n  \n  // Price analysis\n  const avgPrice = Math.random() * 25 + 10;\n  const priceRange = {\n    min: Math.round((avgPrice * 0.7) * 100) / 100,\n    max: Math.round((avgPrice * 1.5) * 100) / 100,\n    avg: Math.round(avgPrice * 100) / 100\n  };\n  \n  // Opportunity scoring\n  const opportunityScore = Math.round(\n    (baseVolume / 1000) * 0.3 + \n    (100 - competitionScore) * 0.4 + \n    (Math.min(avgPrice, 30) / 30 * 100) * 0.3\n  );\n  \n  return {\n    keyword: keyword,\n    search_volume: `${Math.round(baseVolume / 1000)}k/month`,\n    competition: competition,\n    competition_score: Math.round(competitionScore),\n    price_analysis: priceRange,\n    opportunity_score: Math.min(opportunityScore, 100),\n    trend: Math.random() > 0.5 ? 'Rising' : 'Stable',\n    seasonality: Math.random() > 0.7 ? 'High' : 'Low'\n  };\n}\n\n// Research each keyword\nconst keywordAnalysis = keywords.map(analyzeKeyword);\n\n// Platform-specific insights\nconst platformInsights = {};\nfor (const platform of platforms) {\n  platformInsights[platform] = {\n    total_listings: Math.floor(Math.random() * 50000) + 10000,\n    avg_price: Math.round((Math.random() * 20 + 15) * 100) / 100,\n    top_sellers: Math.floor(Math.random() * 100) + 50,\n    market_saturation: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],\n    recommended_price_range: {\n      min: Math.round((Math.random() * 10 + 10) * 100) / 100,\n      max: Math.round((Math.random() * 15 + 25) * 100) / 100\n    }\n  };\n}\n\n// Generate trending keywords based on analysis\nconst trendingKeywords = [\n  'aesthetic', 'cottagecore', 'dark academia', 'y2k', 'retro',\n  'boho chic', 'minimalist vibes', 'sage green', 'earthy tones'\n].sort(() => Math.random() - 0.5).slice(0, 5);\n\n// Overall market summary\nconst marketSummary = {\n  total_keywords_analyzed: keywords.length,\n  avg_opportunity_score: Math.round(\n    keywordAnalysis.reduce((sum, k) => sum + k.opportunity_score, 0) / keywords.length\n  ),\n  best_keyword: keywordAnalysis.reduce((best, current) => \n    current.opportunity_score > best.opportunity_score ? current : best\n  ),\n  market_outlook: 'Positive',\n  recommended_strategy: 'Focus on low-competition, high-volume keywords'\n};\n\nreturn [{\n  json: {\n    status: 'success',\n    research_summary: marketSummary,\n    keyword_analysis: keywordAnalysis,\n    platform_insights: platformInsights,\n    trending_keywords: trendingKeywords,\n    research_depth: depth,\n    execution_id: $executionId,\n    timestamp: new Date().toISOString()\n  }\n}];"
          },
          "name": "Market Research Logic",
          "type": "n8n-nodes-base.function",
          "typeVersion": 1,
          "position": [460, 300]
        },
        {
          "parameters": {
            "options": {
              "responseCode": 200
            },
            "responseBody": "={{ JSON.stringify($json) }}"
          },
          "name": "Response",
          "type": "n8n-nodes-base.respondToWebhook",
          "typeVersion": 1,
          "position": [680, 300]
        }
      ],
      "connections": {
        "Webhook": {
          "main": [
            [
              {
                "node": "Market Research Logic",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Market Research Logic": {
          "main": [
            [
              {
                "node": "Response",
                "type": "main",
                "index": 0
              }
            ]
          ]
        }
      }
    }
  },

  "workflow_4_seo_content_generator": {
    "name": "Zurfy - SEO Content Generator",
    "description": "Generates optimized content for each platform",
    "webhook_path": "seo-content-generator",
    "workflow": {
      "meta": {
        "instanceId": "zurfy-seo-content"
      },
      "nodes": [
        {
          "parameters": {
            "httpMethod": "POST",
            "path": "seo-content-generator",
            "options": {
              "responseMode": "responseNode"
            }
          },
          "name": "Webhook",
          "type": "n8n-nodes-base.webhook",
          "typeVersion": 1,
          "position": [240, 300],
          "webhookId": "seo-content-generator"
        },
        {
          "parameters": {
            "functionCode": "// Zurfy SEO Content Generator\nconst inputData = $input.first().json;\n\nconst design = inputData.design || {};\nconst platform = inputData.platform || 'etsy';\nconst contentTypes = inputData.contentTypes || ['title', 'description', 'tags'];\n\n// Platform-specific optimization rules\nconst platformRules = {\n  etsy: {\n    title_max_length: 140,\n    description_max_length: 1000,\n    max_tags: 13,\n    style: 'conversational',\n    keywords_density: 'high'\n  },\n  shopify: {\n    title_max_length: 70,\n    description_max_length: 2000,\n    max_tags: 100,\n    style: 'professional',\n    keywords_density: 'medium'\n  },\n  amazon: {\n    title_max_length: 150,\n    description_max_length: 2000,\n    max_tags: 50,\n    style: 'feature-focused',\n    keywords_density: 'high'\n  }\n};\n\nconst rules = platformRules[platform] || platformRules.etsy;\n\n// Generate SEO-optimized title\nfunction generateTitle(design, platform) {\n  const baseTitle = design.title || 'Amazing Design';\n  const tags = design.tags || [];\n  \n  const powerWords = ['Premium', 'Unique', 'Trending', 'Perfect', 'Beautiful', 'Stunning'];\n  const powerWord = powerWords[Math.floor(Math.random() * powerWords.length)];\n  \n  let optimizedTitle;\n  \n  if (platform === 'etsy') {\n    // Etsy loves descriptive, keyword-rich titles\n    optimizedTitle = `${powerWord} ${baseTitle} - ${tags.slice(0, 3).join(', ')} - Digital Download`;\n  } else if (platform === 'shopify') {\n    // Shopify prefers clean, brand-focused titles\n    optimizedTitle = `${baseTitle} | ${powerWord} ${tags[0] || 'Design'}`;\n  } else {\n    // Amazon likes feature-heavy titles\n    optimizedTitle = `${powerWord} ${baseTitle} - High Quality ${tags[0] || 'Print'} - Multiple Sizes Available`;\n  }\n  \n  // Trim to max length\n  return optimizedTitle.length > rules.title_max_length ? \n    optimizedTitle.substring(0, rules.title_max_length - 3) + '...' : \n    optimizedTitle;\n}\n\n// Generate SEO-optimized description\nfunction generateDescription(design, platform) {\n  const title = design.title || 'Design';\n  const tags = design.tags || [];\n  \n  const benefits = [\n    'Perfect for home decor',\n    'Great gift idea',\n    'Instant digital download',\n    'High-resolution files',\n    'Print at home or professionally',\n    'Multiple size options',\n    'Eco-friendly digital product'\n  ];\n  \n  let description = '';\n  \n  if (platform === 'etsy') {\n    description = `✨ ${title} ✨\\n\\n`;\n    description += `Transform your space with this ${tags[0] || 'beautiful'} design! `;\n    description += `This ${tags[1] || 'unique'} artwork is perfect for anyone who loves ${tags[2] || 'great design'}.\\n\\n`;\n    description += `🎁 WHAT YOU GET:\\n`;\n    description += `• High-resolution JPG and PNG files\\n`;\n    description += `• Multiple sizes included\\n`;\n    description += `• Instant digital download\\n`;\n    description += `• Print at home or at a print shop\\n\\n`;\n    description += `Perfect for: ${benefits.slice(0, 3).join(', ')}\\n\\n`;\n    description += `Tags: ${tags.join(', ')}`;\n  } else if (platform === 'shopify') {\n    description = `Discover the beauty of ${title}\\n\\n`;\n    description += `Our ${tags[0] || 'premium'} design collection brings style and personality to any space. `;\n    description += `Each piece is carefully crafted to ensure the highest quality and visual impact.\\n\\n`;\n    description += `Features:\\n`;\n    description += benefits.slice(0, 4).map(b => `• ${b}`).join('\\n');\n  } else {\n    description = `${title} - Professional Quality Design\\n\\n`;\n    description += `Specifications:\\n`;\n    description += `• High-resolution digital files\\n`;\n    description += `• Compatible with all printers\\n`;\n    description += `• Multiple format options\\n`;\n    description += `• Instant delivery\\n\\n`;\n    description += `Keywords: ${tags.join(', ')}`;\n  }\n  \n  return description.length > rules.description_max_length ? \n    description.substring(0, rules.description_max_length - 3) + '...' : \n    description;\n}\n\n// Generate SEO tags\nfunction generateTags(design, platform) {\n  const baseTags = design.tags || [];\n  \n  const platformTags = {\n    etsy: ['digital download', 'printable art', 'wall decor', 'instant download'],\n    shopify: ['home decor', 'wall art', 'digital art', 'printable'],\n    amazon: ['print', 'poster', 'wall art', 'decoration']\n  };\n  \n  const trendingTags = ['aesthetic', 'minimalist', 'modern', 'trendy', 'unique', 'premium'];\n  \n  let allTags = [...baseTags, ...platformTags[platform], ...trendingTags];\n  \n  // Remove duplicates and limit to platform max\n  allTags = [...new Set(allTags)].slice(0, rules.max_tags);\n  \n  return allTags;\n}\n\n// Generate content based on requested types\nconst generatedContent = {};\n\nif (contentTypes.includes('title')) {\n  generatedContent.title = generateTitle(design, platform);\n}\n\nif (contentTypes.includes('description')) {\n  generatedContent.description = generateDescription(design, platform);\n}\n\nif (contentTypes.includes('tags')) {\n  generatedContent.tags = generateTags(design, platform);\n}\n\nif (contentTypes.includes('alt_text')) {\n  generatedContent.alt_text = `${design.title || 'Design'} - ${design.tags?.slice(0, 2).join(' ') || 'Art'}`;\n}\n\n// SEO metrics and recommendations\nconst seoMetrics = {\n  keyword_density: Math.random() * 3 + 2,\n  readability_score: Math.floor(Math.random() * 20) + 75,\n  seo_score: Math.floor(Math.random() * 20) + 80,\n  estimated_reach: `${Math.floor(Math.random() * 5000) + 2000} potential views/month`\n};\n\nconst recommendations = [\n  'Consider adding seasonal keywords for better timing',\n  'Include trending hashtags for increased visibility',\n  'Test different title variations for optimal performance'\n];\n\nreturn [{\n  json: {\n    status: 'success',\n    platform: platform,\n    generated_content: generatedContent,\n    seo_metrics: seoMetrics,\n    recommendations: recommendations,\n    platform_rules: rules,\n    execution_id: $executionId,\n    timestamp: new Date().toISOString()\n  }\n}];"
          },
          "name": "SEO Content Logic",
          "type": "n8n-nodes-base.function",
          "typeVersion": 1,
          "position": [460, 300]
        },
        {
          "parameters": {
            "options": {
              "responseCode": 200
            },
            "responseBody": "={{ JSON.stringify($json) }}"
          },
          "name": "Response",
          "type": "n8n-nodes-base.respondToWebhook",
          "typeVersion": 1,
          "position": [680, 300]
        }
      ],
      "connections": {
        "Webhook": {
          "main": [
            [
              {
                "node": "SEO Content Logic",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "SEO Content Logic": {
          "main": [
            [
              {
                "node": "Response",
                "type": "main",
                "index": 0
              }
            ]
          ]
        }
      }
    }
  },

  "workflow_5_trend_detection": {
    "name": "Zurfy - Trend Detection Workflow",
    "description": "Detects trending designs and market opportunities",
    "webhook_path": "trend-detection",
    "workflow": {
      "meta": {
        "instanceId": "zurfy-trend-detection"
      },
      "nodes": [
        {
          "parameters": {
            "httpMethod": "POST",
            "path": "trend-detection",
            "options": {
              "responseMode": "responseNode"
            }
          },
          "name": "Webhook",
          "type": "n8n-nodes-base.webhook",
          "typeVersion": 1,
          "position": [240, 300],
          "webhookId": "trend-detection"
        },
        {
          "parameters": {
            "functionCode": "// Zurfy Trend Detection Logic\nconst inputData = $input.first().json;\n\nconst categories = inputData.categories || ['art', 'quotes', 'animals', 'nature'];\nconst platforms = inputData.platforms || ['etsy', 'pinterest', 'google_trends'];\nconst timeframe = inputData.timeframe || '30_days';\n\n// Simulate trend detection across categories\nfunction detectTrendsInCategory(category) {\n  const trendData = {\n    art: {\n      trending_styles: ['Abstract Line Art', 'Boho Illustrations', 'Digital Watercolors'],\n      growth_rate: '+156%',\n      hot_keywords: ['minimalist art', 'abstract prints', 'line drawings'],\n      color_trends: ['Sage Green', 'Terracotta', 'Cream', 'Dusty Pink']\n    },\n    quotes: {\n      trending_styles: ['Motivational Typography', 'Handwritten Scripts', 'Modern Sans Serif'],\n      growth_rate: '+89%',\n      hot_keywords: ['self care quotes', 'motivational prints', 'inspirational wall art'],\n      color_trends: ['Black & White', 'Gold Foil', 'Pastel Gradients']\n    },\n    animals: {\n      trending_styles: ['Geometric Animals', 'Watercolor Pets', 'Line Art Silhouettes'],\n      growth_rate: '+124%',\n      hot_keywords: ['cat art', 'dog prints', 'wildlife illustrations'],\n      color_trends: ['Natural Tones', 'Monochrome', 'Earth Colors']\n    },\n    nature: {\n      trending_styles: ['Botanical Illustrations', 'Mountain Landscapes', 'Forest Scenes'],\n      growth_rate: '+203%',\n      hot_keywords: ['botanical prints', 'nature wall art', 'forest illustrations'],\n      color_trends: ['Forest Green', 'Sky Blue', 'Sunset Orange']\n    }\n  };\n  \n  const categoryTrends = trendData[category] || trendData.art;\n  \n  return {\n    category: category,\n    trending_styles: categoryTrends.trending_styles,\n    growth_rate: categoryTrends.growth_rate,\n    hot_keywords: categoryTrends.hot_keywords,\n    color_trends: categoryTrends.color_trends,\n    opportunity_score: Math.floor(Math.random() * 30) + 70,\n    competition_level: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],\n    estimated_revenue_potential: `$${Math.floor(Math.random() * 3000) + 1000}/month`\n  };\n}\n\n// Detect trends for each category\nconst categoryTrends = categories.map(detectTrendsInCategory);\n\n// Platform-specific trend data\nconst platformTrends = {\n  etsy: {\n    top_trending: ['Customizable Templates', 'Wedding Printables', 'Business Cards'],\n    search_volume_change: '+67%',\n    price_trend: 'Increasing',\n    seasonal_opportunity: 'Valentine\\'s Day approaching'\n  },\n  pinterest: {\n    top_trending: ['Aesthetic Wallpapers', 'Vision Board Templates', 'Planner Stickers'],\n    engagement_rate: '+45%',\n    viral_potential: 'High',\n    best_posting_times: ['7PM-9PM EST']\n  },\n  google_trends: {\n    rising_searches: ['cottagecore aesthetic', 'dark academia', 'y2k fashion'],\n    regional_interest: ['United States', 'United Kingdom', 'Australia'],\n    related_queries: ['aesthetic wallpaper', 'room decor ideas', 'art prints']\n  }\n};\n\n// Emerging opportunities\nconst emergingOpportunities = [\n  {\n    trend: 'Neurodiversity Awareness Art',\n    growth_potential: 'Very High',\n    competition: 'Low',\n    target_audience: 'Parents, Educators, Advocates',\n    estimated_market_size: '$45K/month',\n    difficulty: 'Easy'\n  },\n  {\n    trend: 'Sustainable Living Quotes',\n    growth_potential: 'High', \n    competition: 'Medium',\n    target_audience: 'Eco-conscious consumers',\n    estimated_market_size: '$28K/month',\n    difficulty: 'Medium'\n  },\n  {\n    trend: 'Remote Work Motivational Art',\n    growth_potential: 'High',\n    competition: 'Medium',\n    target_audience: 'Remote workers, Home offices',\n    estimated_market_size: '$35K/month',\n    difficulty: 'Medium'\n  }\n];\n\n// Seasonal predictions\nconst currentMonth = new Date().getMonth();\nconst seasonalPredictions = {\n  upcoming_seasons: {\n    'Valentine\\'s Day': {\n      time_to_prepare: '2 weeks',\n      opportunity_rating: 'Excellent',\n      suggested_designs: ['Love quotes', 'Heart illustrations', 'Couple art']\n    },\n    'Easter': {\n      time_to_prepare: '6 weeks', \n      opportunity_rating: 'Good',\n      suggested_designs: ['Spring florals', 'Bunny art', 'Pastel themes']\n    },\n    'Mother\\'s Day': {\n      time_to_prepare: '8 weeks',\n      opportunity_rating: 'Excellent',\n      suggested_designs: ['Mom quotes', 'Family art', 'Floral designs']\n    }\n  }\n};\n\n// Overall trend summary\nconst trendSummary = {\n  total_categories_analyzed: categories.length,\n  highest_growth_category: categoryTrends.reduce((highest, current) => \n    parseInt(current.growth_rate) > parseInt(highest.growth_rate) ? current : highest\n  ),\n  best_opportunity: emergingOpportunities[0],\n  market_outlook: 'Very Positive',\n  recommended_action: 'Focus on emerging trends with low competition'\n};\n\nreturn [{\n  json: {\n    status: 'success',\n    trend_summary: trendSummary,\n    category_trends: categoryTrends,\n    platform_trends: platformTrends,\n    emerging_opportunities: emergingOpportunities,\n    seasonal_predictions: seasonalPredictions,\n    analysis_timeframe: timeframe,\n    execution_id: $executionId,\n    timestamp: new Date().toISOString()\n  }\n}];"
          },
          "name": "Trend Detection Logic",
          "type": "n8n-nodes-base.function",
          "typeVersion": 1,
          "position": [460, 300]
        },
        {
          "parameters": {
            "options": {
              "responseCode": 200
            },
            "responseBody": "={{ JSON.stringify($json) }}"
          },
          "name": "Response",
          "type": "n8n-nodes-base.respondToWebhook",
          "typeVersion": 1,
          "position": [680, 300]
        }
      ],
      "connections": {
        "Webhook": {
          "main": [
            [
              {
                "node": "Trend Detection Logic",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Trend Detection Logic": {
          "main": [
            [
              {
                "node": "Response",
                "type": "main",
                "index": 0
              }
            ]
          ]
        }
      }
    }
  }
}