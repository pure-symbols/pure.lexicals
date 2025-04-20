

mod iter 
{
	pub mod iterador 
	{
		pub trait Iterador: std::iter::Iterator + std::clone::Clone 
		{
			fn pair(&self) -> std::option::Option<(Self::Item, Self)> 
			{
				let mut tail = self.clone();
				tail.next().map(|head| (head, tail))
			}
		}
		impl<T: std::iter::Iterator + std::clone::Clone> Iterador for T {}
		
		pub fn pair<I>(iter: &I) -> std::option::Option<(I::Item, I)> 
		where 
			I: Iterador, 
		{
			iter.pair()
		}
		
		pub fn iterate<T, F>(init: T, mut f: F) -> impl Iterador<Item = T> 
		where 
			F: std::ops::FnMut(T) -> T + std::clone::Clone, 
			T: std::clone::Clone, 
		{
			std::iter::successors(
				std::option::Option::Some(init.clone()), 
				move |x| std::option::Option::Some(f(x.clone())))
		}
		
		pub fn unfold<T, S, F>(init: S, mut f: F) -> impl Iterador<Item = T> 
		where 
			F: std::ops::FnMut(S) -> (T, S) + std::clone::Clone, 
			T: std::clone::Clone, S: std::clone::Clone, 
		{
			std::iter::successors(
					std::option::Option::Some(f(init.clone())), 
					move |&(_, ref s)| std::option::Option::Some(f(s.clone())))
				.map(|(value, _)| value)
		}
	}
}

fn main () 
{
	{
		let fib = iter::iterador::iterate(
				(0, 1), 
				|(a, b)| (b, a + b))
			.map(|(a, _)| a);
		
		if let Some((head, tail)) = iter::iterador::pair(&fib)
		{
			println!("2: head: {}", head); //> 2: head: 0
			println!("2: tail 13: {:?}", tail.take(13).collect::<Vec<_>>());
			//> 2: tail 13: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
			println!("2: fib 13: {:?}", fib.take(13).collect::<Vec<_>>());
			//> 2: fib 13: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
		}
	}
	
	{
		let fib = iter::iterador::unfold((0, 1), |(a, b)| (a, (b, a + b)));
		
		use iter::iterador::Iterador as _;
		if let Some((head, tail)) = fib.pair() // <_ as iter::iterador::Iterador>::pair(&fib)
		{
			println!("3: head: {}", head); //> 3: head: 0
			println!("3: tail 13: {:?}", tail.take(13).collect::<Vec<_>>());
			//> 3: tail 13: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
			println!("3: fib 13: {:?}", fib.take(13).collect::<Vec<_>>());
			//> 3: fib 13: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
		}
	}
	
	{
		let pi_leib0 = iter::iterador::unfold(0, |k| (4.0 * (-1_f64).powi(k as i32) / (2 * k + 1) as f64, k + 1));
		let pi_leibn = pi_leib0.take(1024*1024).sum::<f64>();
		
		println!("pi: pi_leibn: {}", pi_leibn); //> pi: pi_leibn: 3.141591699915466
		
		let pi_leib = iter::iterador::unfold(
			(0, 0.0), 
			|(k, tail)| (|head| (head, (k + 1, head)))
				(tail + (4.0 * (-1_f64).powi(k as i32) / (2 * k + 1) as f64)));
		println!("pi: pi_leib: {:?}", pi_leib.take(5).collect::<Vec<_>>());
		//> pi: pi_leib: [4.0, 2.666666666666667, 3.466666666666667, 2.8952380952380956, 3.3396825396825403]
		
		let pi_gale = iter::iterador::unfold(
			(1_f64, 1_f64 / 2_f64.sqrt(), 0.25_f64, 1_f64), 
			|(a, b, t, p)| ( |aa| (
				(a + b).powi(2) / (4.0 * t), 
				(
					aa, 
					(a * b).sqrt(), 
					t - p * ((a - aa) as f64).powi(2), 
					p * 2.0)))((a + b) / 2.0));
		println!("pi: pi_gale: {:?}", pi_gale.take(5).collect::<Vec<_>>());
		//> pi: pi_gale: [2.914213562373095, 3.1405792505221686, 3.141592646213543, 3.141592653589794, 3.141592653589794]
		
		let pi_gale_next = iter::iterador::unfold(
			(1_f64, 1_f64 / 2_f64.sqrt(), 0.25_f64, 1_f64), 
			|(a, b, t, p)| ( |aa| ( |(bb, tt, pp)| (
				((aa + bb) as f64).powi(2) / (4.0 * tt), 
				(aa, bb, tt, pp)))((
					(a * b).sqrt(), 
					t - p * ((a - aa) as f64).powi(2), 
					p * 2.0)))((a + b) / 2.0));
		println!("pi: pi_gale_next: {:?}", pi_gale_next.take(5).collect::<Vec<_>>());
		//> pi: pi_gale_next: [3.1405792505221686, 3.141592646213543, 3.141592653589794, 3.141592653589794, 3.141592653589794]
		
		let pi_liuhui = iter::iterador::unfold(
			(6_u64, 1_f64, 1_f64), 
			|(n, l, r)| ( |hp| (
				(n as f64) * l / (r * 2.0), 
				(
					n * 2, 
					((r - (r.powi(2) - hp as f64).sqrt()).powi(2) + hp as f64).sqrt(), 
					r)
			))((l / 2.0).powi(2)));
		println!("pi: pi_liuhui: {:?}", pi_liuhui.take(5).collect::<Vec<_>>());
		//> pi: pi_liuhui: [3.0, 3.105828541230249, 3.1326286132812378, 3.1393502030468667, 3.14103195089051]
		
		let pi_zuchongzhi = iter::iterador::unfold(
			(6_u64, 1_f64, 2.0 / 3_f64.sqrt(), 1_f64), 
			|(n, l_in, l_out, r)| 
				(|(hp_in, h_out)| 
				(|(apothem_in, tangent_length, nn)| 
				(|(ll_in, ll_out)| 
				(|(pi_low, pi_high)| 
				(|(pi_approx, rr)| (
					pi_approx, 
					(nn, ll_in, ll_out, rr)
				))((
					(pi_low + pi_high) / 2.0, 
					r)
				))((
					(nn as f64) * ll_in / (2.0 * r), 
					(nn as f64) * ll_out / (2.0 * r))
				))((
					((hp_in + (r - (apothem_in as f64)).powi(2)) as f64).sqrt(), 
					(2.0 * r * h_out) / ((tangent_length as f64) + r))
				))((
					(r.powi(2) - (hp_in as f64)).sqrt(), 
					(r.powi(2) + (h_out as f64).powi(2)).sqrt(), 
					n * 2)
				))((
					(l_in / 2.0).powi(2), 
					l_out / 2.0)
				));
		println!("pi: pi_zuchongzhi: {:?}", pi_zuchongzhi.take(5).collect::<Vec<_>>());
		//> pi: pi_zuchongzhi: [3.160609425201861, 3.1461442776893698, 3.1427182090891512, 3.1418732752679395, 3.1416627611326438]
	}
	
	{
		let x = iter::iterador::iterate(2, |a| a + 1);
		println!("x: {:?}", x.skip(3).take(2).collect::<Vec<_>>());
		//> x: [5, 6]
		let x = iter::iterador::iterate(2, |a| a + 1);
		println!("x: {:?}", x.skip(3).filter(|a| a % 2 != 0).take(2).collect::<Vec<_>>());
		//> x: [5, 7]
		let x = iter::iterador::iterate(2, |a| a + 1);
		if let Some((head, tail)) = iter::iterador::pair(&x) 
		{
			println!("x: head: {}", head);
			//> x: head: 2
			println!(
				"x: tail: {:?}", 
				tail.clone()
					.skip(3)
					.filter(|a| a % 2 != 0)
					.take(2)
					.collect::<Vec<_>>());
			//> x: tail: [7, 9]
			println!(
				"x: tail: {:?}", 
				tail.clone()
					.filter(|a| a % 2 != 0)
					.take(2)
					.collect::<Vec<_>>());
			//> x: tail: [3, 5]
		}
	}
	
	{
		// let prime = iter::iterador::unfold(
		//     iter::iterador::iterate(2, |a| a + 1), 
		//     |naturals| (
		//     if let Some((head, tail)) = iter::iterador::pair(&naturals) {
		//         (
		//             head, 
		//             iter::iterador::by_iter(tail.filter(|x| *x < &head * &head || x % &head != 0)))
		//     } else {
		//         (-1, naturals)
		//     })
		// );
	}
}