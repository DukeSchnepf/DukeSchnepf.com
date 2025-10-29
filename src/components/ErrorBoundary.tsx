import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <Card glass className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 text-red-500">Something went wrong</h1>
            <p className="text-gray-400 mb-6">
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-gray-400 mb-2">Error details</summary>
                <pre className="bg-black/50 p-4 rounded text-sm overflow-auto text-gray-300">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <Button onClick={() => window.location.reload()} variant="primary" size="lg">
              Refresh Page
            </Button>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

