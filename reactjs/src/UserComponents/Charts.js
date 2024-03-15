import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const Charts = () => {

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Charts</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                        <li className="breadcrumb-item active">Charts</li>
                    </ol>
                    <div className="card mb-4">
                        <div className="card-body">
                            Chart.js is a third party plugin that is used to generate the charts in this template. The charts below have been customized - for further customization options, please visit the official
                            <a target="_blank" href="https://www.chartjs.org/docs/latest/">  Chart.js documentation</a>
                            .
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-chart-area me-1"></i>
                            Area Chart Example
                        </div>
                        <div className="card-body">
                            <div class="chartjs-size-monitor">
                                <div class='chartjs-size-monitor-expand'>
                                    <div class></div>
                                </div>
                                <div class='chartjs-size-monitor-shrink'>
                                    <div class></div>
                                </div>
                            </div>
                            <canvas id="myAreaChart" width="100%" height="30" class='chartjs-render-monitor' ></canvas></div>
                        <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-chart-bar me-1"></i>
                                    Bar Chart Example
                                </div>
                                <div className="card-body"><canvas id="myBarChart" width="100%" height="50"></canvas></div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-chart-pie me-1"></i>
                                    Pie Chart Example
                                </div>
                                <div className="card-body"><canvas id="myPieChart" width="100%" height="50"></canvas></div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>

    )
}

export default Charts