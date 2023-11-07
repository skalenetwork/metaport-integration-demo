/**
 * @license
 * SKALE portal
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * @file App.tsx
 * @copyright SKALE Labs 2023-Present
 */


import './App.css'

import { Metaport } from '@skalenetwork/metaport'
import '@skalenetwork/metaport/dist/style.css'

import logo from './assets/skale_lg.svg'

import { METAPORT_CONFIG } from './metaportConfig'

METAPORT_CONFIG.projectId = import.meta.env.VITE_WC_PROJECT_ID

export default function App() {
  return (
    <div
      style={{ background: 'linear-gradient(144deg, rgb(0 0 0), rgb(38 38 38))', height: '100vh' }}
    >
      <img src={logo} style={{ width: '100px', margin: '30px'}} />
      <Metaport config={METAPORT_CONFIG} />
    </div>
  )
}
