import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import dotenv from 'dotenv'
import tools from '@/tools'

dotenv.config()

async function main(): Promise<void> {
    const server = new McpServer({
        name: 'mcp-brasil-transparente',
        version: '1.0.0',
    })

    tools(server)

    const transport = new StdioServerTransport()
    await server.connect(transport)

    console.error('MCP Brasil Transparente Server is running on stdio')
}

main().catch((error) => {
    console.error('Fatal error in main():', error)
    process.exit(1)
})
