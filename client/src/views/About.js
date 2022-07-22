import Button from 'react-bootstrap/Button'
import Phone from '../assets/phone-fill.svg'
import Mail from '../assets/mailbox.svg'
import gitHub from '../assets/github.svg'
import Messenger from '../assets/messenger.svg'
import Facebook from '../assets/facebook.svg'
import NotiToast from '../components/about/NotiToast'
import { useState } from 'react'
import useViewport from './customHook/useViewport'

const About = () => {
	//set email to Clipboard
	const gmailUrl = `email khoatran30620@gmail.com`
	const phoneNumber = `phone 0915527900`
	const gitUrl = `github.com/WynriusCoder479`
	const facebookUrl = `facebook.com/Wynrius`
	const messengerUrl = `m.me/Wynrius`

	const [showNotiToast, setShowNotiToast] = useState(false)
	const [itemCopy, setItemCopy] = useState('gmail')

	const copyItemToClipBoard = item => {
		let copyItem = item.split(' ')
		navigator.clipboard.writeText(copyItem[1])
		setItemCopy(copyItem[0] === 'email' ? 'Gmail' : 'Phone number')
		setShowNotiToast(true)
	}

	const viewPort = useViewport()
	const isMobile = viewPort.width <= 1024

	const linkSize = isMobile ? 'fs-6' : 'fs-4'
	const iconSize = isMobile ? '20' : { iconSize }

	return (
		<>
			<h1 style={{ color: '#757d8a', textAlign: 'center', marginTop: '15px' }}>
				My contact
			</h1>
			<table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
				<tbody>
					<tr>
						<th>
							<img
								src={Mail}
								alt='gmail'
								width={iconSize}
								height={iconSize}
								style={{ marginRight: '5px' }}
							/>
						</th>
						<th>
							<Button
								variant='link'
								className={linkSize}
								onClick={() => copyItemToClipBoard(gmailUrl)}>
								{gmailUrl.split(' ')[1]}
							</Button>
						</th>
					</tr>
					<tr>
						<th>
							<img
								src={Phone}
								alt='Phone'
								width={iconSize}
								height={iconSize}
								style={{ marginRight: '5px' }}
							/>
						</th>
						<th>
							<Button
								variant='link'
								className={linkSize}
								onClick={() => copyItemToClipBoard(phoneNumber)}>
								{phoneNumber.split(' ')[1]}
							</Button>
						</th>
					</tr>
					<tr>
						<th>
							<img
								src={gitHub}
								alt='git'
								width={iconSize}
								height={iconSize}
								style={{ marginRight: '5px' }}
							/>
						</th>
						<th>
							<Button
								variant='link'
								href={`https://${gitUrl}`}
								target='_blank'
								className={linkSize}>
								{gitUrl}
							</Button>
						</th>
					</tr>
					<tr>
						<th>
							<img
								src={Facebook}
								alt='facebook'
								width={iconSize}
								height={iconSize}
								style={{ marginRight: '5px' }}
							/>
						</th>
						<th>
							<Button
								variant='link'
								href={`https://${facebookUrl}`}
								target='_blank'
								className={linkSize}>
								{facebookUrl}
							</Button>
						</th>
					</tr>
					<tr>
						<th>
							<img
								src={Messenger}
								alt='messenger'
								width={iconSize}
								height={iconSize}
								style={{ marginRight: '5px' }}
							/>
						</th>
						<th>
							<Button
								variant='link'
								href={`https://${messengerUrl}`}
								target='_blank'
								className={linkSize}>
								messenger.com/Wynrius
							</Button>
						</th>
					</tr>
				</tbody>
			</table>
			<NotiToast
				isShow={showNotiToast}
				closeToast={() => setShowNotiToast(false)}
				itemCopy={itemCopy}
			/>
		</>
	)
}

export default About
